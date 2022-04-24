// pages/invoice/acquisitionCost/components/filter/filter.js
const app = getApp()
// 引入插件安装器
import plugin from '../calendar/plugins/index'
// 禁用/启用可选状态
import selectable from '../calendar/plugins/selectable'
Component({
    lifetimes: {
        attached: function () {
            this.getTypeBeforeInitData(this.properties.invoiceTypes)
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
        },
        invoiceTypes: {
            type: Object,
            value: {},
            observer: function (lists) {
                this.getTypeBeforeInitData(lists)
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        cCalendar: null,
        iCalendar: null,
        _dateTarget: null,
        filterTop: 0,
        invoiceType: null,
        default_invoice_type_list: [],
        default_invoice_status_list: [
            [{
                name: "全部",
                sid: -1,
                isSelect: false,
                widthType: 0,
            }, {
                name: "审核中",
                sid: 0,
                isSelect: false,
                widthType: 0,
            }],
            [{
                name: "审核通过",
                sid: 1,
                isSelect: false,
                widthType: 0,
            }, {
                name: "审核失败",
                sid: 2,
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
        getTypeBeforeInitData: function (lists) {
            let that = this
            let invoiceType = []
            if (lists instanceof Array && lists.length > 0) {
                // 添加一个全部选项
                let first_line = [{
                    type: "全部",
                    id: 0,
                    isSelect: false,
                    widthType: 0,
                }]
                // 和第一个拼接成第一行
                let first_option = lists[0]
                first_option = Object.assign(first_option, {
                    isSelect: false,
                    widthType: 0,
                })
                first_line.push(first_option)
                invoiceType.push(first_line)
                // 轮询其他类型, 两个一行
                for (let i = 1; i < lists.length; i += 2) {
                    let option_line = []
                    for (let j = 0; j < 2; j++) {
                        // 超出长度则跳过
                        if (lists[i + j] === undefined) {
                            continue
                        }
                        let option = Object.assign(lists[i + j], {
                            isSelect: false,
                            widthType: 0,
                        })
                        option_line.push(option)
                    }
                    if (option_line.length === 1) {
                        option_line[0].widthType = 1
                    }
                    invoiceType.push(option_line)
                    // 最后一个元素为长条
                }
                that.setData({
                    default_invoice_type_list: invoiceType
                })
            }
            that.initData()
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
                for (let j = 0; j < i.length; j++) {
                    if (i[j].id === 0) {
                        continue
                    }
                    if (i[j].isSelect) {
                        type_filter.push(i[j].id)
                    }
                }
            })
            _r.invoice_status_list.forEach(i => {
                for (let j = 0; j < i.length; j++) {
                    if (i[j].sid === -1) {
                        continue
                    }
                    if (i[j].isSelect) {
                        status_filter.push(i[j].sid)
                    }
                }
            })
            if (type_filter.length > 0) {
                res.invoiceType = type_filter
            }
            if (status_filter.length > 0) {
                res.invoiceStatus = status_filter
            }
            console.debug("filter res is ", res)
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
        afterCCalendarRender(e) {
            this.data.cCalendar = this.selectComponent('#ccd').calendar
            plugin.use(selectable)
        },
        afterICalendarRender(e) {
            this.data.iCalendar = this.selectComponent('#cid').calendar
            plugin.use(selectable)
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
                // this.setData({
                //     showCreateCal: false
                // })
                if (target === 'cStartDate') {
                    let _config = this.data.calendar_config_cd
                    _config = Object.assign(_config, {
                        disableMode: {
                            // 禁用某一天之前/之后的所有日期
                            type: 'before', // [‘before’, 'after']
                            date: select_date // 无该属性或该属性值为假，则默认为当天
                        },
                    })
                    this.setData({
                        calendar_config_cd : _config,
                        showCreateCal: false
                    })
                } else if (target === 'cEndDate') {
                    let _config = this.data.calendar_config_cd
                    _config = Object.assign(_config, {
                        disableMode: {
                            // 禁用某一天之前/之后的所有日期
                            type: 'after', // [‘before’, 'after']
                            date: select_date // 无该属性或该属性值为假，则默认为当天
                        },
                    })
                    this.setData({
                        calendar_config_cd : _config,
                        showCreateCal: false
                    })
                }
            } else if (['iStartDate', 'iEndDate'].includes(target)) {
                this.setData({
                    showInvoiceDate: false
                })

                if (target === 'iStartDate') {
                    let _config = this.data.calendar_config_id
                    _config = Object.assign(_config, {
                        disableMode: {
                            // 禁用某一天之前/之后的所有日期
                            type: 'before', // [‘before’, 'after']
                            date: select_date // 无该属性或该属性值为假，则默认为当天
                        },
                    })
                    this.setData({
                        calendar_config_id : _config,
                        showInvoiceDate: false
                    })
                } else if (target === 'iEndDate') {
                    let _config = this.data.calendar_config_id
                    _config = Object.assign(_config, {
                        disableMode: {
                            // 禁用某一天之前/之后的所有日期
                            type: 'after', // [‘before’, 'after']
                            date: select_date // 无该属性或该属性值为假，则默认为当天
                        },
                    })
                    this.setData({
                        calendar_config_id : _config,
                        showInvoiceDate: false
                    })
                }
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
                    theme: 'elegant', //elegant
                    onlyShowCurrentMonth: false,
                    preventSwipe: true,
                    // highlightToday: true,
                    chooseAreaMode: true,
                },
                calendar_config_id: {
                    theme: 'elegant', //elegant
                    onlyShowCurrentMonth: false,
                    preventSwipe: true,
                    // highlightToday: true,
                    chooseAreaMode: true,
                },
            }

            this.setData(initConfig)
        }
    }
})