// pages/serviceFee/paymentSuccessful/index.js
const tempPath = getApp().globalData.imgPath;
const util = require('../../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: tempPath + '/serviecFee/detail/icon_pay_success.png'
  },


  toback() {
    wx.redirectTo({
      url: '../payment/index',
    })
    // wx.navigateBack({
    //   delta: 2
    // })
  },

  todetail() {
    // wx.navigateBack({
    //   delta: 2
    // })
    wx.redirectTo({
      url: '../details/index',
    })
  },

  fn(val) {
    return val < 10 ? '0' + val : val;
  },
  getTime() {
    let str = ''
    let date = new Date()
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let sencode = date.getSeconds();
    str = year + '-' + this.fn(month) + '-' + this.fn(day) + ' ' + this.fn(hour) + ':' + this.fn(minute) + ':' + this.fn(sencode)
    this.setData({
      noTime: str
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTime()
    this.setData({
      orderno: options.orderno,
      starttime: options.starttime,
      endtime: options.endtime,
      money: options.money,
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