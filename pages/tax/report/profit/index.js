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
        checkedMonth: '',
        checkedQuater: '',
        empty_bg_url: emptyBg,
        dropdown: imgpath + 'report/dropdown_icon.png',
        date: imgpath + 'report/date_blue.png',
        title: '利润表',
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
        monthImage: '',
        quarterImage: '',
        quarterYear: '',
        quarterMonth: ''
    },
    initData() {
        let that = this;
        getQuarter().then(res => {
            if (res.ret) {
                if (res.data.length > 0) {
                    // 处理最早时间
                    const createMonth = res.data[0].month;
                    const createQuarter = Math.ceil(res.data[0].month / 3);
                    const startTime = res.data[0].year + '-' + createMonth
                    res.data[0].list = res.data[0].list.filter(i => i.replace(/\D/g, '') >= createQuarter)
                    let _column_year = [];
                    let _column_quater = [];
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
                        const objectMultiArray = [_column_year, _column_quater]
                        that.setData({
                            objectMultiArray: [_column_year, _column_quater]
                        })
                        const _data = that.data
                        let data = {
                            startTime: startTime,
                            objectMultiShow: this.data.objectMultiShow,
                            objectMultiArray: this.data.objectMultiArray,
                            multiArray: this.data.multiArray,
                            multiIndex: this.data.multiIndex,
                            quarterArrayIndex: this.data.multiIndex,
                            quarterArrayShow: this.data.objectMultiShow
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
                        data.quarterArrayShow = data.objectMultiShow
                        data.multiArray = data.objectMultiShow.map(item => {
                            item = item.map(i => i.name)
                            return item
                        })
                        // 设置初始化的年份季度
                        let arr = data.objectMultiArray
                        let column_1 = arr[1][arr[1].length - 1].parentId
                        let column_2 = arr[1][arr[1].length - 1].id
                        data.multiIndex = [column_1, column_2]

                        // picker更新
                        that.setData(data)
                    })
                    const quarterInfo = _column_quater[_column_quater.length - 1]
                    const qm = quarterInfo
                    const qy = _column_year.filter(i=>i.id == quarterInfo.parentId)[0]
                    that.setData({
                        quarterYear: qy.name,
                        quarterMonth: qm.name.replace(/\D/g,'')
                    })
                }
            }
        })
    },
    // 获取季度
    getQuarter() {
        // 获取picker初始化的数据
        let that = this;
        if (this.data.checkedQuater) {
            console.log("checked quarter already exists", this.data.checkedQuater)
        } else {
            const __yearList = this.data.objectMultiArray[0]
            const _yearInfo = __yearList[__yearList.length - 1]
            const __monthList = this.data.objectMultiArray[1]
            const _monthInfo = __monthList[__monthList.length - 1]
            if (_monthInfo.parentId === _yearInfo.id) {
                const param = {
                    type: '3',
                    year: _yearInfo.name,
                    month: _monthInfo.name.replace(/\D/g, '')
                }
                that.getDetails(param)
                that.setData({
                    checkedQuater: _yearInfo.name + '-' + _monthInfo.name.replace(/\D/g, ''),
                })
            }
        }
    },
    // 请求数据
    getDetails(param) {
        let that = this
        reportForm(param).then(res => {
            if (res.ret) {
                if (param.type === '2') {
                    that.setData({
                        company_name: res.data.company_name,
                        tax_number: res.data.tax_number,
                        image: res.data.image || '',
                        monthImage: res.data.image || '',
                    })
                } else if (param.type === '3') {
                    that.setData({
                        company_name: res.data.company_name,
                        tax_number: res.data.tax_number,
                        image: res.data.image || '',
                        quarterImage: res.data.image || ''
                    })
                }

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
            isShowMonth: true,
            image: this.data.monthImage
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
            isShowMonth: false,
            image: this.data.quarterImage
        })
        this.getQuarter()
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
            this.downloadImg()

        }
    },
    tapDialogSaveButton(e) {
        if (e.detail.item.text == '取消') {
            this.setData({
                isShowModal: false,
                isShowSaveModal: false,
            })
        } else {
            this.downloadImg()
            this.setData({
                isShowSaveModal: false,
                isShowModal: false,
            })
        }
    },
    // 保存图片
    downloadImg: function () {
        utils.saveImgToAlbum(this.data.image)
    },

    bindMultiPickerChange: function (e) {
        let _data = this.data.objectMultiShow
        console.debug('picker发送选择改变，携带值为', e.detail)
        const _year = _data[0][e.detail.value[0]].name
        const _month = _data[1][e.detail.value[1]].name.replace(/\D/g, '')
        if (this.data.checkedQuater) {
            let _selectedYear = this.data.checkedQuater.split('-')[0]
            let _selectedQuarter = this.data.checkedQuater.split('-')[1]
            if (_year === _selectedYear && _month === _selectedQuarter) {
                return
            }
        }
        const param = {
            type: '3',
            year: _year,
            month: _month
        }
        this.getDetails(param)
        this.setData({
            multiIndex: e.detail.value,
            quarterYear: _year,
            quarterMonth: _month,
            checkedQuater: _year + '-' + _month
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
        data.multiIndex[e.detail.column] = e.detail.value;
        // 改变第i列数据之后，后几列选择第0个选项（重置）
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
        this.initData()
        this.getMonths()
        // this.getQuarter()

        // let that = this;
        // getFullYear().then(res => {
        //     if (res.ret) {
        //         that.setData({
        //             startTime: res.data.year + "-" + res.data.month + "-01",
        //         })
        //     }
        // })
        // if (this.data.isShowMonth) {

        // } else if (this.data.isShowQuarter) {
        //     this.getQuarter()
        // }
    },
    getMonths: function () {
        if (this.data.checkedMonth) {
            const checkedMonth = this.data.checkedMonth
            const _year = checkedMonth.split('-')[0]
            const _month = checkedMonth.split('-')[1]
            const param = {
                type: '2',
                year: _year,
                month: _month
            }
            this.getDetails(param);
        } else {
            // 获取默认数据进行初始化
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
            // 最后的月份为上一个月/季度
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
                // endTime: _endYear + "-" + "12-01",
                endTime: _year + "-" + _month,
                showDate: _year + "年第" + _month + "期",
            })
        }
    }
})
