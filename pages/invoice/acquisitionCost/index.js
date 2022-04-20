// pages/invoice/acquisitionCost/index.js
const app = getApp()
const {
    searchBill,
    getInvoiceType
} = require('../../../http/api/api_szpj')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        canFlip: true,
        filterIcon: app.globalData.imgPath + 'invoice/acquisitionCost/filterIconBlue.png',
        invoiceIcon: app.globalData.imgPath + 'invoice/acquisitionCost/invoiceIcon.png',
        filterIconActive: app.globalData.imgPath + 'invoice/acquisitionCost/filterIconYellow.png',
        emptyPic: app.globalData.emptyPic,
        showFilter: false,
        showRes: true,
        isSearchActive: false,
        searchKey: null,
        searchPage: 0,
        pageSize: 5,
        searchResult: null,
        isScroll: false,
        filterTop: 0,
        showEmtpy: false,
        invoiceType: null,
        _filteredData: null,
        _filters: null,

    },
    onLoad: function () {
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
        this._getInvoiceType()
        searchBill(onloadParams).then(res => {
            if (res.ret) {
                if (res.data.list.length === 0) {
                    that.setData({
                        showEmpty: true
                    })
                } else {
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
                }

            } else {
                console.error("无法获取后台数据: ", res)
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
            })
        } else { //设为显示
            this.setData({
                showFilter: true,
                showRes: false,
                canFlip: false
            })
        }
    },
    _getInvoiceType: function () {
        let that = this
        getInvoiceType().then(res => {
            if (res.ret) {
                if (res.data instanceof Array && res.data.length > 0) {
                    that.setData({
                        invoiceTypes: res.data
                    })
                }
            } else {
                console.error("获取增值税发票类型失败: ", res.message)
            }
        }).catch(err => {
            console.error(err)
            wx.showToast({
                title: '网络出错啦，请稍后再试',
                icon: 'none'
            })
        })
    },
    _getFilter: function (d) {
        let filters = {}
        filters.needRequest = false
        for (let key in d) {
            if (d[key] !== null && d[key] !== [0]) {
                if (key === 'invoiceType') {
                    filters['invoice_type'] = d[key][0]
                } else if (key === 'invoiceStatus') {
                    filters['status'] = d[key][0]
                } else if (['cInvoiceEnd', 'cInvoiceStart', 'iInvoiceEnd', 'iInvoiceStart'].includes(key)) {
                    filters.needRequest = true
                    // filters[key] = d[key]
                    if (key === 'cInvoiceEnd') {
                        filters["create_end_time"] = d[key]
                    } else if (key === 'cInvoiceStart') {
                        filters["create_start_time"] = d[key]
                    } else if (key === 'iInvoiceEnd') {
                        filters["bill_end_time"] = d[key]
                    } else if (key === 'iInvoiceStart') {
                        filters["bill_start_time"] = d[key]
                    }
                }
            }
        }
        return filters
    },
    handleFilterRes: function (d) {
        var that = this
        const raw_filter = d.detail
        const _filters = this._getFilter(raw_filter)
        this.setData({
            _filters: _filters
        })
        if (_filters.needRequest) {
            this.setData({
                showFilter: false,
                showRes: true,
                canFlip: true
            })
            wx.navigateTo({
                url: './filterResult/index?type=request',
                success: function (res) {
                    res.eventChannel.emit('passFilters', that.data._filters)
                    that.setData({
                        _filters: null
                    })
                }
            })
        } else {
            let _list = this.data.searchResult || []
            let _filter_res = _list;
            for (let key in _filters) {
                if (key === 'needRequest') {
                    continue
                }
                // 从当前列表筛选
                _filter_res = _filter_res.filter(l => {
                    if (l instanceof Object && key in l) {
                        return l[key] === _filters[key]
                    }
                })
            }
            console.debug("filter after filter", _filter_res)
            if(_filter_res !== null){
                this.setData({
                    showFilter: false,
                    showRes: true,
                    canFlip: true,
                    _filteredData: _filter_res
                })
                wx.navigateTo({
                    url: './filterResult/index?type=filtered',
                    success: function (res) {
                        res.eventChannel.emit('passFilteredData', that.data._filteredData)
                        that.setData({
                            _filteredData: null
                        })
                    }
                })
            }else{
                this.setData({
                    showFilter: false,
                    showRes: true,
                    canFlip: true,
                }) 
            }
        }
    },
    showSearch: function () {
        this.setData({
            isSearchActive: true,
            showFilter: false
        })
        wx.navigateTo({
            url: './searchPage/index',
        })
    },
    handleBackArrow: function () {
        if (this.data.showFilter) {
            this.setData({
                isSearchActive: false,
                showFilter: false
            })
        } else {
            wx.switchTab({
                url: '../invoiceIndex/index',
            })
        }

    },
    goDetail: function (e) {
        const vid = e.currentTarget.dataset.vid
        wx.navigateTo({
            url: './invoiceDetails/index?id=' + vid,
        })
    }

})