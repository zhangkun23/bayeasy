// pages/faq/index.js
const tempPath = getApp().globalData.imgPath;
const {
  feedbackStatus,
  commonProblemList
} = require('../../http/api/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qa: tempPath + 'index/qa_icon.png',
    bottomicon: tempPath + 'index/floatingButton_white.png',
    empty_bg_url: tempPath + 'public/emptyBackGround.png',
    isShowList: false,
    commonProblemList: [],
    isStatus: 0
  },

  gotoMessage() {
    wx.navigateTo({
      url: './feedback/index',
    })
  },
  feedbackFn() {
    if (this.data.isStatus == 0) {
      wx.navigateTo({
        url: './feedback/index',
      })
    } else {
      wx.navigateTo({
        url: './feedbackList/index',
      })
    }
  },
  // 获取是否有留言记录
  getFeedbackStatus() {
    feedbackStatus().then(res => {
      console.log(res)
      if (res.ret) {
        this.setData({
          isStatus: res.data.status
        })
      }
    })
  },
  // 获取列表
  getCommonProblemList() {
    let params = {
      page: 1,
      page_size: 10
    }
    commonProblemList(params).then(res => {
      console.log(res)
      if (res.ret) {
        this.setData({
          commonProblemList: res.data.list
        })
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFeedbackStatus();
    this.getCommonProblemList();
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