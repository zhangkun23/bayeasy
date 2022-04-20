// pages/tax/Successfully/index.js

const tempPath = getApp().globalData.imgPath;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info_max: tempPath + "public/info_max.png",
    showTips: false,
    tax: 800,
    paramsId: 0
  },
  // backTaxIndex() {
  //   wx.navigateTo({
  //     url: '../taxreturn/index',
  //   })
  // },
  gotoReult() {
    wx.navigateTo({
      url: '../deatil/deatil?type=result&id=' + this.data.paramsId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id) {
      this.setData({
        paramsId: options.id
      })
    }
    let key = wx.getStorageSync('overdueStatus');
    if (key == 0) {
      this.setData({
        showTips: true
      })
    } else if (key == 1) {
      this.setData({
        showTips: false
      })
    }
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