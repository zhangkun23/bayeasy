// pages/invoice/acquisitionCost/searchResult/index.js
const {
    searchBill
} = require('../../../../http/api/api_szpj')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showNav: true,
        searchKey: '',
        page: 0,
        pageSize: 10,
        searchResult: null,
        enablePullDown: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (option) {
        var that = this;
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.emit('acceptKeyFromOpenedPage', {
            data: 'test'
        });
        eventChannel.emit('passSearchKeyBack', {
            data: 'test'
        });
        // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
        eventChannel.on('passSearchKey', function (data) {
            that.setData({
                searchKey: data.key
            })
            that.requestSearch()
        })
    },


    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.enablePullDown) {
            this.requestSearch()
        } else {
            wx.showToast({
                title: '没有更多数据啦',
                icon: 'none'
            })
        }
    },

    handleSearchKey: function (event) {
        console.log("input handler event")
        this.setData({
            searchKey: event.detail
        })
    },
    handleBackArrow: function () {
        wx.navigateTo({
            url: '../index',
        })
    },
    goSearch: function () {
        // 不返回搜索页直接返回初始页
        var that = this;
        wx.navigateTo({
            url: '../searchPage/index',
            success: function (res) {
                res.eventChannel.emit('passSearchParams', {
                    key: that.data.searchKey
                })
            }
        })
        // wx.navigateTo({
        //   url: '../index',
        // })
    },
    requestSearch: function () {
        var that = this;
        const onloadParams = {
            page: this.data.page + 1,
            page_size: this.data.pageSize,
            search_key: this.data.searchKey,

        }
        searchBill(onloadParams).then(res => {
            if (res.ret) {
                if (!res.data.list.length) {
                    that.setData({
                        enablePullDown: false
                    })

                } else {
                    res.data.list.forEach(e => {
                        Object.keys(e).forEach(function (key) {
                            if (e[key] === null) {
                                e[key] = ''
                            }
                        })
                    })
                    that.setData({
                        page: that.data.page + 1,
                        searchResult: res.data.list
                    })
                }
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
    goDetail: function (e) {
        const vid = e.currentTarget.dataset.vid
        wx.navigateTo({
            url: '../invoiceDetails/index?vid=' + vid,
        })
    }
})