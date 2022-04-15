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
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('passSearchParams', function (data) {
            if (data instanceof Object && 'key' in data) {
                that.setData({
                    searchKey: data.key
                })
            }
            // if (data instanceof Object && 'billFilter' in data) {
            //     this.setData({
            //         billFilter: data.billFilter
            //     })
            // }
            // if (data instanceof Object && 'page' in data) {
            //     this.setData({
            //         page: data.page
            //     })
            // }
            // if (data instanceof Object && 'pageSize' in data) {
            //     this.setData({
            //         pageSize: data.pageSize
            //     })
            // }
        })
        this.setData({
            eventChannel: eventChannel
        })
        this.setHistory()
    },
    setHistory: function () {
        let history = wx.getStorageSync('invoiceSearchHistory') || []
        this.setData({
            history: history
        })
    },
    handleSearchKey: function (event) {
        this.setData({
            searchKey: event.detail
        })
    },
    handleHistory(k) {
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
    goSearch: function (event) {
        var that = this;
        let key;
        if (event && event.type === 'gosearch' && event.detail) {

            this.setData({
                searchKey: event.detail
            })
            key = event.detail
        }else{
            key = this.data.searchKey

        }
        if (!key) {
            wx.navigateTo({
                url: '../index',
            })
        } else {
            this.handleHistory(key)
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