// pages/invoice/invoiceUpload/updateImg/index.js
const tempPath = getApp().globalData.imgPath;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        other_invoice:tempPath+'invoice/invoiceUpdate/other_invoice.png',
        image_invoice:tempPath+"invoice/invoiceUpdate/image_invoice.png"
    },
    // 跳转上传页面
    updateInvoce(){
        wx.navigateTo({
            url: '/pages/invoice/invoiceUpload/updateImgInfo/index',
        })
    },
    backIndex(){
        console.log( getCurrentPages())
        console.log('图片上传')
        wx.navigateBack({ //返回
            delta: 2
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