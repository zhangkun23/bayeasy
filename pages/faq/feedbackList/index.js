// pages/faq/feedbackList/index.js
const tempPath = getApp().globalData.imgPath;
const { feedbackList }= require("../../../http/api/api")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    empty_bg_url: tempPath + 'public/emptyBackGround.png',
    updateIcon: tempPath + 'index/floatingButton_blue.png',
    bottomicon: tempPath + 'index/floatingButton_white.png',
    isShowList: false,
    feedbackList: []
  },

  feedbackFn() {
    wx.navigateTo({
      url: '../feedback/index',
    })
  },
  getFeedbackList(){
    let params = {
      page: 1,
      page_size: 10
    }
    feedbackList(params).then(res => {
      console.log(res)
      if(res.ret) {
        this.setData({
          feedbackList: res.data.list
        })
      } 
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFeedbackList();
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