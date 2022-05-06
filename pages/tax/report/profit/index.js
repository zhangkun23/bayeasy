// pages/tax/report/profit/index.js
const imgpath = getApp().globalData.imgPath;
const utils = require('../../../../utils/util');
const {
    getQuarter,
    getFullYear,
    reportForm
} = require('../../../../http/api/api_csbl');
const emptyBg = getApp().globalData.emptyPic


Page({

    /**
     * 页面的初始数据
     */
    data: {
        empty_bg_url: emptyBg,
        dropdown: imgpath + 'report/dropdown_icon.png',
        date: imgpath + 'report/date_blue.png',
        title: '利润表',
        startTime: '',
        endTime: '',
        showDate: '',
        isShowModal: false,
        isShowSaveModal: false,
        isShowReport: false,
        isShowMonth: true,
        isShowQuarter: false,
        buttons: [{
                text: '取消'
            },
            {
                text: '确认'
            }
        ],
        saveImgBtn: [{
                text: '取消'
            },
            {
                text: '确认'
            },
        ],
        objectMultiShow: [],
        objectMultiArray: [],
        multiArray: [],
        multiIndex: [],
        // multiIndex: [1, 2], //默认显示的内容
        image: '',
    },

    // 获取季度
    getQuarter() {
        let _column_year = [];
        let _column_quater = [];
        getQuarter().then(res => {
            if (res.ret) {
                let date = res.data[0].year + '-' + res.data[0].month;
                this.setData({
                    startTime: date
                })
                res.data.map((item, index) => {
                    _column_year.push({
                        id: index,
                        name: item.year
                    })
                    item["list"].map((litem, lindex) => {
                        _column_quater.push({
                            id: lindex,
                            name: litem,
                            parentId: index
                        })
                    })
                })
                const objectMultiArray = [_column_year, _column_quater]
                this.setData({
                    // startTime: res.data[0].year,
                    // endTime: res.data[res.data.length - 1].year,
                    objectMultiArray: [_column_year, _column_quater]
                })
                const _data = this.data
                let data = {
                    objectMultiShow: this.data.objectMultiShow,
                    objectMultiArray: this.data.objectMultiArray,
                    multiArray: this.data.multiArray,
                    multiIndex: this.data.multiIndex,
                }
                data = Object.assign(data, _data)
                data.objectMultiShow = objectMultiArray.map((item, index) => {
                    // 回归
                    if (index > 0) {
                        // item = item.filter(i => i.parentId === objectMultiArray[index - 1][i.parentId].id)
                        // 第二列的所有项目 是在这句话取得 需要拿到最长那列
                        // 获取最长那条 
                        let _iid = 0;
                        let _longNum = null;
                        objectMultiArray[index - 1].map((item, index) => {
                            if (!_longNum) {
                                _iid = index
                                _longNum = item.length
                            } else {
                                if (item.length > _longNum) {
                                    _longNum = item.length
                                }
                            }
                        })
                        // 获取第二列的可展示项目
                        item = item.filter(i => i.parentId === objectMultiArray[index - 1][_iid].id)

                    }
                    return item
                })
                data.multiArray = data.objectMultiShow.map(item => {
                    item = item.map(i => i.name)
                    return item
                })
                let arr = data.objectMultiArray
                let column_1 = arr[1][arr[1].length - 1].parentId
                let column_2 = arr[1][arr[1].length - 1].id
                data.multiIndex = [column_1, column_2]
                // 数据更新
                this.setData(data)
            }
        })
    },
    getDetails(param) {
        reportForm(param).then(res => {
            if (res.ret) {
                this.setData({
                    company_name: res.data.company_name,
                    tax_number: res.data.tax_number,
                    image: res.data.image
                })
            } else {
                this.setData({
                    company_name: '',
                    tax_number: ''
                })
            }
        }).catch(err => {
            console.error("无法请求利润表数据: ", err)
            this.setData({
                company_name: '',
                tax_number: ''
            })
        })
    },
    // 图片放大
    previewImg: function (e) {
        const src = e.currentTarget.dataset.src;
        wx.previewImage({
            urls: [src],
        })
    },
    // 月报
    showMonth() {
        if (this.data.isShowMonth) {
            return
        }
        this.setData({
            isShowQuarter: false,
            isShowMonth: true
        })

        this.getMonths()
    },
    // 季报
    showQuarter() {
        if (this.data.isShowQuarter) {
            return
        }
        this.setData({
            isShowQuarter: true,
            isShowMonth: false
        })
        // this.getDetails(param)
    },
    // 修改日期
    changeDate(event) {
        const details = event.detail.value
        const _year = details.split('-')[0]
        const _month = details.split('-')[1]
        const param = {
            type: '2',
            year: _year,
            month: _month
        }
        this.getDetails(param)
        this.setData({
            checkedMonth: event.detail.value,
            showDate: _year + "年第" + _month + "期"
        })
    },
    // 保存图片
    saveImg() {
        this.setData({
            isShowModal: true
        })
    },
    tapDialogButton(e) {
        if (e.detail.item.text === "取消") {
            this.setData({
                isShowModal: false,
            })
        } else {
            this.setData({
                isShowModal: false,
                isShowSaveModal: true
            })
            const testData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAB6ElEQVRIS7WWPU8UURSGn/fOGCOJlVZqQ2IhiQ7R1j+gMYGYWIgMhYVaoAm/wGBhb6IVJlrsqiWBCPwDWrJjY6CgAW2MiWyjZmePmdkPF1jmK3Dbc+77nq973isyjtWDS2CToDsYAY7zGH8R3zFt4WyVNssKo52jYDTMYJ+uXyCO5xEPMfysIIAW0juce6GpjW8HfQ8RWC2YAKsjnc0BPmC2PXw3rfuNz4OGfQT2cfwZcfsVkisH3vU2ayM3p7Dxune/T9CNfLEyeA8xITnlJnuZpARpzVutrzll+YV4DuZhegmcOTpL28Pzx5KedAjqwQLwKLssWlfYuNn1/wJczfSXFjTdeKJ0FMV2gWnZBe5B7IG3BJzLnS4YldWvzYLeVGpq3iXHbJLBGnArz7eaXSuyWrCDuJgLIH5i8QRySZOToEYK3NmUfQh+Y5zOdaZkkzuAzZMlEH+Kl6hKBsZu0uRV4PYJlWitxJhW6YE9Lf7QjA3NRDc6L3l8C+xy9kumhTFaYlUQg9VAHhACQ7VkgPStwuhxmWWX36b/G7WJ71/pL7s07Y7QHM+6Rnc1Ey0nuMcvOJ6b04MhgtPPrqpkmjVBYS/yQ4o2WOBSoq90Wt7jefOFRH8f0bBvS+LQ5gciAlsBLWV9W/4Bbg7jZGHDuk4AAAAASUVORK5CYII="
            utils.saveImgToAlbum(testData)
        }
    },
    tapDialogSaveButton(e) {
        if (e.detail.item.text == '取消') {
            this.setData({
                isShowModal: false,
                isShowSaveModal: false
            })
        } else {
            this.setData({
                isShowSaveModal: false,
                isShowModal: false,
            })
            // this.downloadImg()
        }
    },
    // 保存图片
    downloadImg: function () {
        const url = 'https://image.bayeasy.cn/images-datas/report/balance_list.png'
        utils.saveImgToAlbum(url)
    },

    bindMultiPickerChange: function (e) {
        let _data = this.data.objectMultiShow
        console.debug('picker发送选择改变，携带值为', e.detail)
        const _year = _data[0][e.detail.value[0]].name
        const _month = _data[1][e.detail.value[1]].name.replace(/\D/g, '')
        const param = {
            type: '3',
            year: _year,
            month: _month
        }
        this.getDetails(param)
        this.setData({
            multiIndex: e.detail.value
        })
    },
    bindMultiPickerColumnChange: function (e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        // 初始化数据
        var data = {
            objectMultiShow: this.data.objectMultiShow,
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        // 改变第i列数据之后，后几列选择第0个选项（重置）
        data.multiIndex[e.detail.column] = e.detail.value;
        for (let i = e.detail.column; i < data.multiIndex.length - 1; i++) {
            data.multiIndex[i + 1] = 0
        }
        let arry = this.data.objectMultiArray
        for (let i = e.detail.column; i < data.multiIndex.length - 1; i++) {
            data.objectMultiShow[i + 1] = arry[i + 1].filter(item => item.parentId === data.objectMultiShow[i][data.multiIndex[i]].id)
            data.multiArray[i + 1] = data.objectMultiShow[i + 1].map(item => item.name)
        }
        // 数据更新
        let _currentData = this.data
        _currentData = Object.assign(_currentData, data)
        this.setData(_currentData);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取开始时间 
        // 结束时间是下一年的12月
        this.getQuarter()

        // let that = this;
        // getFullYear().then(res => {
        //     if (res.ret) {
        //         that.setData({
        //             startTime: res.data.year + "-" + res.data.month + "-01",
        //         })
        //     }
        // })
        // if (this.data.isShowMonth) {
        this.getMonths()
        // } else if (this.data.isShowQuarter) {
        //     this.getQuarter()
        // }
    },
    getMonths: function () {
        let that = this;
        const mydate = new Date()
        let _year = mydate.getFullYear()
        let _month = mydate.getMonth()

        const param = {
            type: '2',
            year: _year,
            month: _month
        }
        this.getDetails(param);

        let _endYear;
        if (_month === 0) {
            _endYear = _year + 1
            _year = _year - 1
            _month = 12
        } else if (0 < _month <= 9) {
            _month = "0" + _month
            _endYear = _year + 1
        } else {
            _endYear = _year + 1
        }
        this.setData({
            checkedMonth: _year + "-" + _month,
            endTime: _endYear + "-" + "12-01",
            showDate: _year + "年第" + _month + "期",
        })
    }
})