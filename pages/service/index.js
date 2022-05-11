// pages/service/index.js
const tempPath = getApp().globalData.imgPath;
const utils = require('../../utils/util')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info_back: tempPath + "index/serviceIntro.png",
        showNav: false
    },

    gotopage() {
        // this.setData({
        //     showNav:false
        // })
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        utils.getTabBarIndex(this, 0);
        let fromType = wx.getStorageSync('serviceIntroType') || ''
        if (fromType === 'gate') {
            this.setData({
                showNav: true
            })
            console.log(this.getTabBar().data)
            this.getTabBar().setData({
                isShow: false
            })
        }
        wx.removeStorageSync('serviceIntroType')
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        wx.removeStorageSync('serviceIntroType')
        this.setData({
            showNav: false
        })
        this.getTabBar().setData({
            isShow: true
        })
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})