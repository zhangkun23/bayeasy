// pages/invoice/invoiceUpload/updateHandel/index.js
const tempPath = getApp().globalData.imgPath;
const {
    updateHandlInvoice,
    getInvoiceType
} = require('../../../../http/api/api_szpj.js')
const {
    baseUrl
} = require('../../../../http/env.js').dev;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        close: tempPath + "invoice/invoiceUpdate/close.png",
        invoiceImage: "",
        addImg: tempPath + "invoice/invoiceUpdate/add.png",
        addImgStatus: true,
        form: {
            invoice_type: '',
            invoice_dm: '',
            invoice_hm: '',
            total_amount: '',
            invoice_check_code: '',
            invoice_date: '',
            file_url: ''
        },
        activityArr: [],
        submit: false,
        buttons: [{
            text: '取消'
        }, {
            text: '确定'
        }],
        isShowModal: false,
        must: false,
        dateStartTime: '2022-01-01',
        dateEndTime: ''
    },
    jump() {
        wx.navigateTo({
            url: '/pages/invoice/invoiceUpload/updateHandelSuccess/index',
        })
    },
    jump2() {
        wx.navigateTo({
            url: '/pages/invoice/invoiceUpload/updateHandelError/index',
        })
    },
    // 手动上传提交
    subbmint() {
        this.setData({
            submit: false
        })
        let param = this.data.form;
        updateHandlInvoice(param).then(res => {
            if (res.ret) {
                wx.navigateTo({
                    url: '/pages/invoice/invoiceUpload/updateHandelSuccess/index',
                })
            } else {
                wx.navigateTo({
                    url: '/pages/invoice/invoiceUpload/updateHandelError/index?errInfo=' + res.message
                })
            }
        })
    },
    // 确认删除/取消
    tapDialogButton(e) {
        this.setData({
            isShowModal: false
        })
        if (e.detail.item.text == '确定') {
            this.setData({
                ['form.file_url']: ""
            })
        }
    },
    // 现实删除弹框
    clearImg() {
        if (this.data.form.file_url) {
            this.setData({
                isShowModal: true
            })
        }
    },
    // 子组建数据同步
    setInputValue(e) {
        let temp = `form.${e.detail.key}`
        this.setData({
            [temp]: e.detail.value //使用子组件的值
        })
        if (e.detail.key == 'total_amount') {
            this.priceEvent(e)
        }
        this.checkSubmit();
    },
    // 交验是否可以提交
    checkSubmit() {
        let form = this.data.form;
        let id = form.invoice_type;
        // 发票类型1 2  4 5 校验码 可以不填写
        if (id == 1 || id == 2 || id == 4 || id == 5) {
            if (form.invoice_type && form.invoice_dm && form.invoice_hm && form.total_amount && form.invoice_check_code && form.invoice_date) {
                this.setData({
                    submit: true
                })
            } else {
                this.setData({
                    submit: false
                })
            }
        } else {
            if (form.invoice_type && form.invoice_dm && form.invoice_hm && form.total_amount && form.invoice_date) {
                this.setData({
                    submit: true
                })
            } else {
                this.setData({
                    submit: false
                })
            }
        }

    },
    // 价格限制小数点后两位
    priceEvent(e) {
        var money;
        if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
            money = e.detail.value;
        } else {
            money = e.detail.value.substring(0, e.detail.value.length - 1);
        }
        this.setData({
            ['form.total_amount']: money,
        })
    },

    // 设置发票类型
    bindPickerChange(e) {
        let category = this.data.activityArr[e.detail.value];
        console.log(category)
        // 1 2 4 5 
        let id = category.id;
        // if(id == 1 || id == 2 || id == 4 || id == 5){
        if (id == 2 || id == 3 || id == 4 || id == 5) {
            this.setData({
                must: true
            })
        } else {
            this.setData({
                must: false
            })
        }
        this.setData({
            ['form.invoice_type']: category.id,
            ['form.invoice_show']: category.type
        });
        this.checkSubmit();
    },
    // 拍照/相册
    updateImage() {
        let that = this;
        wx.showActionSheet({
            itemList: ["从相册中选择", "拍照"],
            success: function (e) {
                //album:相册 返回0  //camera拍照   返回1  
                console.log(e)
                e.cancel || (0 == e.tapIndex ? that.chooseWxImageShop("album") : 1 == e.tapIndex && that.chooseWxImageShop("camera"));
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        });
    },
    setImgSize(ImgArr) {
        if (ImgArr[0].size > 2097152) {
            wx.showModal({
                title: "提示",
                content: "选择的图片过大，请上传不超过2M的图片",
                showCancel: !1,
                success: function (e) {
                    e.confirm;
                }
            })
            return true
        }
        return false;
    },
    chooseWxImageShop(type) {
        var that = this;
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: [type],
            success: function (res) {
                console.log(res)
                let ImgArr = res.tempFiles;
                if (that.setImgSize(ImgArr)) return;
                if (res.tempFiles[0]) {
                    const imgPath = res?.tempFiles[0].tempFilePath;
                    console.log(imgPath)
                    that.setData({
                        ['form.file_url']: imgPath
                    })

                    wx.uploadFile({
                        url: baseUrl + '/upload/file?token=' + wx.getStorageSync('token'),
                        filePath: imgPath,
                        name: 'link',
                        formData: {},
                        success: function (info) {
                            console.log(info)
                        },
                        fail: function (res) {
                            console.log(res, '失败')
                        }
                    })

                }
            }
        })
    },
    // 选择开票日期
    bindDateChange(event) {
        this.setData({
            ['form.invoice_date']: event.detail.value
        })
        this.checkSubmit();
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        const mydate = new Date()
        const today = mydate.getFullYear() + '-' + (mydate.getMonth() + 1) + '-' + mydate.getDate()
        this.setData({
            dateEndTime: today
        })
        getInvoiceType().then(res => {
            if (res.ret) {
                this.setData({
                    activityArr: res.data
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})