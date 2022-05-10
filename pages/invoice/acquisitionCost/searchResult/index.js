// pages/invoice/acquisitionCost/searchResult/index.js
const app = getApp()
const {
    searchBill
} = require('../../../../http/api/api_szpj')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        emptyPic: app.globalData.emptyPic,
        invoiceIcon: app.globalData.imgPath + 'invoice/acquisitionCost/invoiceIcon.png',
        showNav: true,
        searchKey: '',
        page: 0,
        pageSize: 10,
        searchResult: null,
        enablePullDown: true,
        enableShowToast: true,
        searchFocus: false,
        showEmpty: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (option) {
        var that = this;
        const eventChannel = this.getOpenerEventChannel()
        // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
        eventChannel.on('passSearchKey', function (data) {
            that.setData({
                searchKey: data.key
            })
            that.requestSearch()
        })
        this.setData({
            eventChannel: eventChannel
        })
    },


    /**
     * 页面上拉触底事件的处理函数
     */
    onScrollVReachBottom: function () {
        if (this.data.enablePullDown && !this.data.showEmpty) {
            this.requestSearch()
        } else {
            if (this.data.enableShowToast) {
                wx.showToast({
                    title: '没有更多啦',
                    icon: 'none',
                    duration: 3000
                })
                this.setData({
                    enableShowToast: false
                })
            }

        }
    },
    handleSearchKey: function (event) {
        console.log("input handler event")
        this.setData({
            searchKey: event.detail
        })
    },
    goSearch: function () {
        // TODO: 这里把方法邦回搜索组件了可能有问题 明天要看看
        wx.navigateBack({
            delta: 1,
        })
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
                if (this.data.page === 0) {
                    if (res.data.total === 0) {
                        this.setData({
                            showEmpty: true
                        })
                        return
                    }
                }
                if (!res.data.list.length) {
                    that.setData({
                        enablePullDown: false,
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
            url: '../invoiceDetails/index?id=' + vid,
        })
    },
    handleBackArrow: function () {
        wx.navigateBack({
            delta: 2,
        })
    },
    handleTouchMove: function (e) {
        return
    }
})