// pages/invoice/acquisitionCost/index.js
const app = getApp()
const {
    searchBill
} = require('../../../http/api/api_szpj.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        filterIcon: app.globalData.imgPath + 'invoice/acquisitionCost/filterIconBlue.png',
        invoiceIcon: app.globalData.imgPath + 'invoice/acquisitionCost/invoiceIcon.png',
        filterIconActive: app.globalData.imgPath + 'invoice/acquisitionCost/filterIconYellow.png',
        showFilter: false,
        showNav: true,
        showRes: true,
        isSearchActive: false,
        searchKey: null,
        billFilter: null,
        searchPage: 0,
        pageSize: 5,
        searchResult: null,
        isScroll: false,
        filterTop: 0,
        enableService: true
    },
    onLoad: function () {
        wx.setStorageSync('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90ZXN0LmdzaC5jb21cL2dzaEFwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2NDkyMTU5NzAsImV4cCI6MTY1NTIxNTk3MCwibmJmIjoxNjQ5MjE1OTcwLCJqdGkiOiJZcjFTcmdlUmFwYXlSV3VzIiwic3ViIjoxMiwicHJ2IjoiMDVkOTI0MWU2MzIzY2UzZTA5ZWM2MDFlOGNjNWEwNzhlNDg0ZjQ1MiJ9.RTNVccoegm36Owl5SJOBftLppecOwDVdM2YS-K9wSmw')
        var that = this;
        let query = wx.createSelectorQuery().in(this);
        query.select('#search').boundingClientRect();
        query.exec(function (res) {
            if (res.length > 0) {
                that.setData({
                    filterTop: res[0].bottom
                })
            }
        })
        const onloadParams = {
            page: 0,
            page_size: 10
        }
        return
        searchBill(onloadParams).then(res => {
            if (res.ret) {
                res.data.list.forEach(e => {
                    Object.keys(e).forEach(function (key) {
                        if (e[key] === null) {
                            e[key] = ''
                        }
                    })
                })
                this.setData({
                    searchResult: res.data.list
                })
            } else {
                console.log("无法获取后台数据: ", res)
                wx.showToast({
                    title: '网络有问题哦！请稍后再试试！',
                    icon: 'none',
                })
            }
        }).catch(e => {
            console.error("获取列表出错: ", e)
        })

    },

    toggleFilter: function () {

        wx.getSystemInfoSync()
        const __show = this.data.showFilter
        if (__show) { // 设为隐藏
            this.setData({
                showFilter: false,
                showRes: true,
                enableService: true
                // showNav: true
            })
        } else { //设为显示
            this.setData({
                showFilter: true,
                showRes: false,
                enableService: false
                // showNav: false
            })
        }
    },
    handleFilterRes: function (d) {
        const raw_filter = d.detail
        let params = {}

        if (raw_filter.invoiceType) {
            params.invoice_type = Number(raw_filter.invoiceType)
        }
        if (raw_filter.invoiceStatus) {
            params.status = Number(raw_filter.invoiceStatus)
        }
        if (raw_filter.iInvoiceStart) {
            params.bill_start_time = raw_filter.iInvoiceStart
        }
        if (raw_filter.iInvoiceEnd) {
            params.bill_end_time = raw_filter.iInvoiceEnd
        }
        if (raw_filter.cInvoiceStart) {
            params.create_start_time = raw_filter.cInvoiceStart
        }
        if (raw_filter.cInvoiceEnd) {
            params.create_end_time = raw_filter.cInvoiceEnd
        }
        this.setData({
            showFilter: false,
            showRes: true,
            showNav: true,
            enableService: true,
            billFilter: params
        })
        // wx.navigateTo({
        //   url: 'url',
        // })
    },
    showSearch: function () {
        this.setData({
            isSearchActive: true,
            showFilter: false
        })
        wx.navigateTo({
            url: './searchPage/index',
        })
        // searchBill(this.billFilter).then(res => {
        //     if (res.ret) {
        //         if (res.data.total === 0) {
        //             this.setData({
        //                 searchResult: []
        //             })
        //         }
        //     }
        // })
        // wx.navigateTo({
        //     url: './searchPage/index',
        //     events: {
        //         acceptDataFromOpenedPage: function (data) {
        //             console.log(data)

        //             // 返回搜索结果 清空现有数据
        //             this.setData({
        //                 searchResult: data
        //             })
        //         },
        //         success: function (res) {
        //             let searchData = {}
        //             // 通过eventChannel向被打开页面传送数据
        //             if (this.data.searchKey) {
        //                 searchData.searchKey = this.data.searchKey
        //             }
        //             if (this.data.billFilter) {
        //                 const _bf = this.data.billFilter
        //                 if (_bf.invoiceType && _bf.invoiceType.length > 0) {
        //                     searchData.invoiceType = _bf.invoiceType[0]
        //                 }
        //                 if (_bf.invoiceStatus && _bf.invoiceStatus.length > 0) {
        //                     searchData.status = _bf.invoiceStatus[0]
        //                 }
        //                 // 开票
        //                 if (_bf.iInvoiceEnd && _bf.iInvoiceEnd.length > 0) {
        //                     searchData.billEndTime = _bf.iInvoiceEnd
        //                 }
        //                 if (_bf.iInvoiceStart && _bf.iInvoiceStart.length > 0) {
        //                     searchData.billStartTime = _bf.iInvoiceStart
        //                 }
        //                 // 创建
        //                 if (_bf.cInvoiceEnd && _bf.cInvoiceEnd.length > 0) {
        //                     searchData.createEndTime = _bf.cInvoiceEnd
        //                 }
        //                 if (_bf.cInvoiceStart && _bf.cInvoiceStart.length > 0) {
        //                     searchData.createStartTime = _bf.cInvoiceStart
        //                 }

        //             }
        //             res.eventChannel.emit('passSearchParams', searchData)
        //         }
        //     }
        // })
    },
    handleBackArrow: function () {
        this.setData({
            isSearchActive: false,
            showFilter: false
        })
    },
    goDetail: function (e) {
        const vid = e.currentTarget.dataset.vid
        wx.navigateTo({
            url: './invoiceDetails/index?vid=' + vid,
        })
    },
    
})