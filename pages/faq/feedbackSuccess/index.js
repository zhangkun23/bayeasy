// pages/faq/feedbackSuccess/index.js
const tempPath = getApp().globalData.imgPath;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    successIconImg: tempPath + "public/done.png",
    info_max: tempPath + "public/info_max.png",
    tax: '',
    paramsId: 0
  },

  gotoReult() {
    wx.navigateTo({
      url: '../feedbackList/index',
    })
  },
  backTaxIndex() {
    wx.switchTab({
      url: '../../index/index',
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