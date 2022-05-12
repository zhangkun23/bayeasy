// components/watermark/watermark.js
const utils = require('../../utils/util')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        imgBase64: String,
        imgUrl: String,
        watermarkText: String,
        ratio: {
            type: String,
            value: '0.2'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        wmTempPath: null,
        imgTempPath: null,
        imgWidth: null,
        imgHeight: null,
        dpr: null
    },
    lifetimes: {
        attached: function () {
            let that = this;
            const dpr = wx.getSystemInfoSync().pixelRatio;

            this.setData({
                dpr: dpr
            })
            this.saveImg()
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        saveImg: function () {
            /* 
                只支持data:image/png;base64, data:image/jpeg;base64,
            */
            let that = this;
            if (this.data.imgBase64) {
                let _pureData = this.data.imgBase64;
                if (this.data.imgBase64.startsWith('data:image/png;base64,')) {
                    _pureData = this.data.imgBase64.slice(22)
                } else if (this.data.imgBase64.startsWith('data:image/jpeg;base64,')) {
                    _pureData = this.data.imgBase64.slice(23)
                }
                const fileManager = wx.getFileSystemManager();
                fileManager.writeFile({
                    filePath: wx.env.USER_DATA_PATH + '/tempBase64Png.png',
                    data: _pureData,
                    encoding: 'base64',
                    success: res => {
                        console.log("保存临时图片成功: ", res)
                        that.setData({
                            imgTempPath: wx.env.USER_DATA_PATH + '/tempBase64Png.png',
                        })
                        that.parseImg(wx.env.USER_DATA_PATH + '/tempBase64Png.png')
                    },
                    fail: err => {
                        console.error("保存临时图片失败: ", err)
                    }
                })
            } else if (this.data.imgUrl) {
                wx.downloadFile({
                    url: this.data.imgUrl,
                    success: res => {
                        if (res.statusCode === 200) {
                            console.log("图片下载至临时文件夹成功")
                            that.setData({
                                imgTempPath: res.tempFilePath
                            })
                            that.parseImg(res.tempFilePath)
                        }
                    },
                    fail: err => {
                        console.error("图片下载至临时文件夹失败")
                    }
                })
            }
        },
        parseImg: function (path) {
            /* 分析要加水印的图片宽高 */
            let that = this
            if (path) {
                console.log(path)
                wx.getImageInfo({
                    src: path,
                    success: res => {
                        console.log("获取图片信息成功:", res)
                        const wmWidth = res.width * that.data.ratio
                        const wmHeight = res.height * that.data.ratio
                        that.setData({
                            wmWidth: wmWidth,
                            wmHeight: wmHeight
                        })
                        that.setData({
                            imgWidth: res.width, // 单位px
                            imgHeight: res.height
                        })
                    },
                    fail: err => {
                        console.error("获取图片信息失败:", err)
                    },
                    complete: res => {
                        that.getWmCanvas()
                    }
                })
            }
        },
        getWmCanvas: function () {
            /* 获取水印canvas */
            this.createSelectorQuery()
                .select('#wmCanvas')
                .fields({
                    node: true,
                    size: true,
                }).exec(this.saveWatermark.bind(this))

            // this.createSelectorQuery()
            //     .select('#myCanvas')
            //     .fields({
            //         node: true,
            //         size: true,
            //     }).exec(this.drawCanvas.bind(this))
        },
        getCanvas: function () {
            /* 获取图片canvas */
            this.createSelectorQuery()
                .select('#myCanvas')
                .fields({
                    node: true,
                    size: true,
                }).exec(this.drawCanvas.bind(this))
        },

        saveWatermark: function (res) {
            /* 制作水印并且保存到本地 */
            let that = this;
            const canvas = res[0].node;
            const canvas_width = this.data.imgWidth / this.data.ratio;
            const canvas_height = this.data.imgHeight / this.data.ratio;

            const context = canvas.getContext('2d');
            // 等比放大画板 如果分辨率清晰的话这步可以不要
            const dpr = this.data.dpr;
            context.scale(dpr, dpr)
            const imgHeight = this.data.wmHeight;
            canvas.width = canvas_width * dpr;
            canvas.height = canvas_height * dpr;
            context.font = '32px sans-serif';
            // 绘制矩形
            context.fillRect(0, imgHeight - 40, 420, 40);
            // 设置画笔颜色
            context.fillStyle = 'white';
            // 填入文字
            context.fillText(this.properties.watermarkText, 0, imgHeight - 10)
            // 将canvas转为为图片
            context.rotate(45 * Math.PI / 180);

            wx.canvasToTempFilePath({
                canvas: canvas,
                success: (res) => {
                    that.setData({
                        wmTempPath: res.tempFilePath
                    })
                    wx.previewImage({
                        urls: [res.tempFilePath],
                    })
                    that.getCanvas()
                },
                fail: err => {
                    console.error("生成水印失败:", err)
                }
            })
        },

        drawCanvas: function (res) {
            /* 一切就绪之后在图片加水印 */
            const canvas = res[0].node
            const canvas_width = this.data.imgWidth
            const canvas_height = this.data.imgHeight
            const context = canvas.getContext('2d')
            // 等比放大画板 如果分辨率清晰的话这步可以不要
            const dpr = this.data.dpr
            canvas.width = canvas_width * dpr
            canvas.height = canvas_height * dpr
            // 将要加水印的图片放入画板
            console.log(this.data.imgTempPath)
            // const url = this.data.imgTempPath
            const url = "https://image.bayeasy.cn/images-datas/report/dropdown_icon.png"
            const imgObj = canvas.createImage()
            imgObj.src = this.data.imgTempPath
            // imgObj.width = canvas_width
            // imgObj.height = canvas_height
            console.log(imgObj)
            imgObj.onload = function () {
                console.log(imgObj)
                context.drawImage(imgObj, 0, 0)
            }
            let pattern
            const wmImgObj = canvas.createImage()
            const wmImgPath = this.data.wmTempPath

            console.log(wmImgPath)
            wmImgObj.src = wmImgPath
            wmImgObj.width = this.data.wmWidth;
            wmImgObj.height = this.data.wmHeight;
            console.log(wmImgObj)
            wmImgObj.onload = function () {
                pattern = context.createPattern(wmImgObj, 'repeat')
                console.log("pattern is ", pattern)
            }
            // 创建水印
            context.fillStyle = pattern
            context.fillRect(0, 0, canvas_width, canvas_height)


        }
    }
})