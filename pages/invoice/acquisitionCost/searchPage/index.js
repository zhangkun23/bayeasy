// pages/invoice/acquisitionCost/searchPage/index.js
// const {
//     searchBill
// } = require('../../../../http/api/api_szpj')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        eventChannel: null,
        // billFilter: null,
        searchKey: '',
        lastSearchKey: '',
        searchFocus: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function (options) {
        let history = this.getHistory()
        const searchKey = history[0] || ''
        this.setData({
            searchFocus: true,
            lastSearchKey: searchKey
        })
    },
    getHistory: function () {
        let history = wx.getStorageSync('invoiceSearchHistory') || []
        this.setData({
            history: history
        })
        return history
    },
    handleSearchKey: function (event) {
        this.setData({
            searchKey: event.detail
        })
    },
    setHistory(k) {
        // 顺序为先进先出 index越小越新
        let history = wx.getStorageSync('invoiceSearchHistory') || []
        let _history = history.slice(0, 9)
        _history.unshift(k)
        this.setData({
            history: _history
        })
        wx.setStorageSync('invoiceSearchHistory', _history)
    },
    btnGoSearch: function () {
        this.goSearch()
    },
    handleBackArrow: function () {
     const pages = getCurrentPages()
     if (pages[pages.length - 2].__route__ === "pages/invoice/acquisitionCost/filterResult/index") {
        wx.navigateBack({
            delta: 2,
        })
    } else {
        wx.navigateBack({
            delta: 1,
        })
    }
    },
    goSearch: function (event) {
        var that = this;
        let key;
        if (event && event.type === 'gosearch' && event.detail) {
            this.setData({
                searchKey: event.detail
            })
            key = event.detail
        } else {
            key = this.data.searchKey
        }
        const pages = getCurrentPages()
        if (!key && !this.data.lastSearchKey) { // 没有搜索关键字 且 没有搜索记录直接点了搜索，如果是筛选页跳转的，返回无状态列表页，否则返回
            // wx.redirectTo({
            //     url: '../index',
            // })
            if (pages[pages.length - 2].__route__ === "pages/invoice/acquisitionCost/filterResult/index") {
                wx.navigateBack({
                    delta: 2,
                })
            } else {
                wx.navigateBack({
                    delta: 1,
                })
            }
        } else if (!key && this.data.lastSearchKey) { // 按照最后一次搜索关键字进行搜索
            wx.navigateTo({
                url: '../searchResult/index',
                success: function (res) {
                    res.eventChannel.emit('passSearchKey', {
                        key: that.data.lastSearchKey
                    })
                }
            })
        } else {
            this.setHistory(key)
            wx.navigateTo({
                url: '../searchResult/index',
                success: function (res) {
                    res.eventChannel.emit('passSearchKey', {
                        key: that.data.searchKey
                    })
                }
            })
        }

    }
})