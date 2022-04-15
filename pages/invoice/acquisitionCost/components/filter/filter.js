// pages/invoice/acquisitionCost/components/filter/filter.js
const app = getApp()
Component({
    // pageLifetimes: {
    //     show: function () {
    //         console.log(">>>>>>>>>")
    //         this.initData()
    //     },
    //     attached: function () {
    //         console.log(">>>>>>>>>")
    //         this.initData()
    //     }
    // },
    lifetimes: {
        attached: function () {
            this.initData()
        }
    },
    /**
     * 组件的属性列表
     */
    properties: {
        showFilter: {
            type: Boolean,
            value: false
        },
        top: {
            type: Number,
            value: 0,
            // observer: function (h) {
            //     console.log("!!!!!!!!", h)
            //     this.setData({
            //         filterTop: h
            //     })
            // }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        filterTop: 0,
        default_invoice_type_list: [
            [{
                name: "全部",
                id: 0,
                isSelect: false,
                widthType: 0,
            }, {
                name: "增值税专用发票",
                id: 1,
                isSelect: false,
                widthType: 0,
            }],
            [{
                name: "增值税普通发票",
                id: 2,
                isSelect: false,
                widthType: 0,
            }, {
                name: "增值税普通发票（电子）",
                id: 3,
                isSelect: false,
                widthType: 0,
            }],
            [{
                name: "增值税普通发票（卷式）",
                id: 4,
                isSelect: false,
                widthType: 0,
            }, {
                name: "通行费发票",
                id: 5,
                isSelect: false,
                widthType: 0,
            }],
            [{
                name: "二手车发票",
                id: 6,
                isSelect: false,
                widthType: 0,
            }, {
                name: "机动车销售统一发票",
                id: 7,
                isSelect: false,
                widthType: 0,
            }],
            [{
                name: "货运运输业增值税专用发票",
                id: 8,
                isSelect: false,
                widthType: 1,
            }]
        ],
        default_invoice_status_list: [
            [{
                name: "全部",
                id: 0,
                isSelect: false,
                widthType: 0,
            }, {
                name: "审核中",
                id: 1,
                isSelect: false,
                widthType: 0,
            }],
            [{
                name: "审核通过",
                id: 2,
                isSelect: false,
                widthType: 0,
            }, {
                name: "审核失败",
                id: 3,
                isSelect: false,
                widthType: 0,
            }]
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        copyArray: function (a) {
            return JSON.parse(JSON.stringify(a))
        },
        getAllOptions: function () {
            let res = {
                invoiceType: null,
                invoiceStatus: null,
                iInvoiceStart: null,
                iInvoiceEnd: null,
                cInvoiceStart: null,
                cInvoiceEnd: null
            }
            const _r = this.copyArray(this.data)
            if (_r.iStartDate !== '开始日期') {
                res.iInvoiceStart = _r.iStartDate
            }
            if (_r.iEndDate !== '结束日期') {
                res.iInvoiceEnd = _r.iEndDate
            }
            if (_r.cStartDate !== '开始日期') {
                res.cInvoiceStart = _r.cStartDate
            }
            if (_r.cEndDate !== '结束日期') {
                res.cInvoiceEnd = _r.cEndDate
            }

            let type_filter = []
            let status_filter = []
            _r.invoice_type_list.forEach(i => {
                i.forEach(j => {
                    if (j.isSelect) {
                        type_filter.push(j.id)
                    }
                })
            })
            _r.invoice_status_list.forEach(i => {
                i.forEach(j => {
                    if (j.isSelect) {
                        status_filter.push(j.id)
                    }
                })
            })
            if (type_filter.length > 0) {
                res.invoiceType = type_filter
            }
            if (status_filter.length > 0) {
                res.invoiceStatus = status_filter
            }
            this.triggerEvent('filterres', res)
        },

        selectTypeOption: function (e) {
            const dataset = e.currentTarget.dataset
            const _k = dataset.k
            const _l = dataset.l
            let _list = this.copyArray(this.data.default_invoice_type_list)
            _list[_k][_l].isSelect = true
            this.setData({
                invoice_type_list: _list
            })
        },
        selectStatOption: function (e) {
            const dataset = e.currentTarget.dataset
            const _k = dataset.k
            const _l = dataset.l
            let _list = this.copyArray(this.data.default_invoice_status_list)
            _list[_k][_l].isSelect = true
            this.setData({
                invoice_status_list: _list
            })
        },
        showCreateCal: function (e) {
            this.setData({
                showCreateCal: true
            })
        },

        toggleCreateCal(e) {
            let target = e.currentTarget.dataset.tar
            this.setData({
                _dateTarget: target,
                showCreateCal: !this.data.showCreateCal
            })
        },
        toggleInvoiceDate(e) {

            let target = e.currentTarget.dataset.tar
            this.setData({
                _dateTarget: target,
                showInvoiceDate: !this.data.showInvoiceDate
            })
        },
        afterTapDate(e) {
            const target = this.data._dateTarget // 获取选择目标
            const select_date = e.detail.year + '-' + e.detail.month + '-' + e.detail.date
            if (target) {
                let _data = this.data
                _data[target] = select_date
                this.setData(_data)
            }
            if (['cStartDate', 'cEndDate'].includes(target)) {
                this.setData({
                    showCreateCal: false
                })
            } else if (['iStartDate', 'iEndDate'].includes(target)) {
                this.setData({
                    showInvoiceDate: false
                })
            }



            // 禁用日期 
            // if (target === 'cStartDate') {
            //     if (!this.data.cEndDate) {
            //         const config = {
            //             defaultDate: select_date,
            //             autoChoosedWhenJump: true,
            //             disableMode: {
            //                 // 禁用某一天之前/之后的所有日期
            //                 type: 'before',
            //                 date: select_date // 无该属性或该属性值为假，则默认为当天
            //             }
            //         }
            //         const newConfig = Object.assign(this.data.calendar_config_cd, config)
            //         this.setData({
            //             calendar_config_cd: newConfig
            //         })
            //     }
            // } else if (target === 'cEndDate') {
            //     if (!this.data.cStartDate) {
            //         const config = {
            //             defaultDate: select_date,
            //             autoChoosedWhenJump: true,
            //             disableMode: {
            //                 // 禁用某一天之前/之后的所有日期
            //                 type: 'after',
            //                 date: select_date // 无该属性或该属性值为假，则默认为当天
            //             }
            //         }
            //         const newConfig = Object.assign(this.data.calendar_config_cd, config)
            //         this.setData({
            //             calendar_config_cd: newConfig
            //         })
            //     }
            // } else if (target === 'iEndDate') {
            //     if (!this.data.iStartDate) {
            //         const config = {
            //             defaultDate: select_date,
            //             autoChoosedWhenJump: true,
            //             disableMode: {
            //                 // 禁用某一天之前/之后的所有日期
            //                 type: 'after',
            //                 date: select_date // 无该属性或该属性值为假，则默认为当天
            //             }
            //         }
            //         const newConfig = Object.assign(this.data.calendar_config_id, config)
            //         this.setData({
            //             calendar_config_id: newConfig
            //         })
            //     }
            // } else if (target === 'iStartDate') {
            //     if (!this.data.iEndDate) {
            //         const config = {
            //             defaultDate: select_date,
            //             autoChoosedWhenJump: true,
            //             disableMode: {
            //                 // 禁用某一天之前/之后的所有日期
            //                 type: 'before',
            //                 date: select_date // 无该属性或该属性值为假，则默认为当天
            //             }
            //         }
            //         const newConfig = Object.assign(this.data.calendar_config_id, config)
            //         this.setData({
            //             calendar_config_id: newConfig
            //         })
            //     }
            // }
            // 关闭页面

        },
        initData() {
            var that = this;
            let invoice_type_list = this.copyArray(this.data.default_invoice_type_list)
            invoice_type_list[0][0].isSelect = true
            let invoice_status_list = this.copyArray(this.data.default_invoice_status_list)
            invoice_status_list[0][0].isSelect = true
            const initConfig = {
                calendarIcon: app.globalData.imgPath + 'invoice/acquisitionCost/calendarIcon.png',
                closeBtnIcon: app.globalData.imgPath + 'public/close-icon.png',
                iStartDate: "开始日期",
                iEndDate: "结束日期",
                cStartDate: "开始日期",
                cEndDate: "结束日期",
                showCreateCal: false,
                createCalStart: null,
                createCalEnd: null,
                showInvoiceDate: false,
                showInvoiceStart: null,
                showInvoiceEnd: null,
                invoice_type_list: invoice_type_list,
                invoice_status_list: invoice_status_list,
                calendar_config_cd: {
                    theme: 'elegant',
                    onlyShowCurrentMonth: false,
                    preventSwipe: true,
                    highlightToday: true,
                },
                calendar_config_id: {
                    theme: 'elegant',
                    onlyShowCurrentMonth: false,
                    preventSwipe: true,
                    highlightToday: true,
                },
            }
            // const ws = wx.getSystemInfoSync().windowWidth;
            // this.setData({ws: ws})
            wx.getSystemInfo({
                success: function (res) {
                    // const xs = res.windowWidth / 750
                    // that.setData({
                    //   xs: xs
                    // })
                    that.setData({
                        maxHeight: res.screenHeight * 0.6
                    });
                }
            });

            // // 然后取出navbar和header的高度
            // // 根据文档，先创建一个SelectorQuery对象实例

            // let query = wx.createSelectorQuery().in(this);
            // // 然后逐个取出navbar和header的节点信息
            // // 选择器的语法与jQuery语法相同
            // // query.select('#navbar').boundingClientRect();
            // // query.select('#header').boundingClientRect();

            // // 执行上面所指定的请求，结果会按照顺序存放于一个数组中，在callback的第一个参数中返回
            // query.exec((res) => {
            //     // 分别取出navbar和header的高度
            //     // let navbarHeight = res[0].height;
            //     // let headerHeight = res[1].height;

            //     // 然后就是做个减法
            //     const ws = this.data.ws
            //     let scrollViewHeight = this.data.screenHeight - this.data.filterTop/ws - 230 - 62; //+48
            //     console.log("screenh" , this.data.screenHeight)
            //     console.log("filterTop " , this.properties.filterTop)
            //     console.log("final height ",scrollViewHeight)

            //     // 算出来之后存到data对象里面
            //     that.setData({
            //         scrollViewHeight: scrollViewHeight
            //     });
            // });
            this.setData(initConfig)
        }
    }
})