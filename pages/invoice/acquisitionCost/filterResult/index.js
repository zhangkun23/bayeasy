// pages/invoice/acquisitionCost/filterResult/index.js
const app = getApp()
const {
    searchBill
} = require('../../../../http/api/api_szpj')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchResult: [],
        showEmpty: true,
        filterIconActive: app.globalData.imgPath + 'invoice/acquisitionCost/filterIconYellow.png',
        emptyPic: app.globalData.emptyPic,
        page: 1,
        pageSize: 10,
        invoiceIcon: app.globalData.imgPath + 'invoice/acquisitionCost/invoiceIcon.png',
        hasMore: true,
        canShowToast: true,
        filters: null
    },
    goSearch: function (e) {
        wx.redirectTo({
            url: '../searchPage/index',
        })
    },
    goNextPage: function (e) {
        if (!this.data.hasMore) {
            if (this.data.canShowToast) {
                wx.showToast({
                    title: '没有更多啦',
                    icon: 'none'
                })
                this.setData({
                    canShowToast: false
                })
            }
            return
        }
        let filters = this.data.filters
        if (!('page' in filters)) {
            filters["page"] = 1
        }
        filters["page"] += 1
        this._search(filters)
    },
    goDetail: function (e) {
        const vid = e.currentTarget.dataset.vid
        wx.navigateTo({
            url: '../invoiceDetails/index?id=' + vid,
        })
    },
    toggleFilter: function () {
        wx.navigateBack({
            delta: 1,
        })
    },
    _search: function (filter) {
        let that = this
        searchBill(filter).then(res => {
            if (res.ret) {
                if (res.data.total === 0) {
                    that.setData({
                        hasMore: false,
                        showEmpty: true,
                        canShowToast: false
                    })
                } else {
                    that._handleSearchResult(res.data.list)
                }
            } else {
                wx.showToast({
                    title: '网络出错,请稍后重试',
                    icon: 'none'
                })
            }
        })
    },
    _handleSearchResult: function (data) {
        let hasMore = true;
        if (data.length === 0) {
            hasMore = false
            wx.showToast({
                title: '没有更多啦',
                icon: 'none'
            })
            this.setData({
                canShowToast: false
            })
        }
        this.setData({
            hasMore: hasMore,
            searchResult: this.data.searchResult.concat(data),
            showEmpty: false
        })
    },
    _searchByFilter: function (filters) {
        let _filters = filters
        delete _filters['needRequest']
        _filters["page"] = this.data.page
        _filters["page_size"] = this.data.pageSize
        this.setData({
            filters: _filters
        })
        this._search(_filters)
    },
    onLoad: function (option) {
        let that = this
        const eventChannel = this.getOpenerEventChannel()
        if (option.type === "request") {
            eventChannel.on('passFilters', function (filters) {
                that._searchByFilter(filters)
            })
        } else if (option.type === "filtered") {
            eventChannel.on('passFilteredData', function (data) {
                if (data.length > 0) {
                    that.setData({
                        searchResult: data,
                        showEmpty: false,
                        hasMore: false
                    })
                }
            })
        }
    }
})