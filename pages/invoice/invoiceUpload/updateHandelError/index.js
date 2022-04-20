// pages/invoice/invoiceUpload/updateHandelSu/index.js
const tempPath = getApp().globalData.imgPath;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        close: tempPath + "invoice/invoiceUpdate/close.png",
        updateHandel_err: tempPath + "invoice/incomeInvoice/updateHandel_err.png",
        errinfo:''
    },

    jumpReact(){
        wx.navigateBack({
            url: '/pages/invoice/invoiceUpload/index/index',
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            errinfo:options.errInfo
        })
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

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

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