// pages/faq/feedback/index.js
const {
  feedbackSubmit
} = require('../../../http/api/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedbackValue: '',
    min: 0,
    max: 500,
    currentWordNumber: 0,
    isShowRedText: false
  },


  onInput(e) {
    var value = e.detail.value;
    var len = parseInt(value.length);
    if (len > this.data.max) return;

    this.setData({
      currentWordNumber: len,
      feedbackValue: value
    });
    if (this.data.currentWordNumber == 500) {
      this.setData({
        isShowRedText: true
      })
      // wx.showModal({
      //   title: '提示',
      //   content: '您输入的次数已达上限',
      // })
    } else {
      this.setData({
        isShowRedText: false
      })
    }
  },
  goToSuccess() {
    feedbackSubmit({
      content: this.data.feedbackValue
    }).then(res => {
      if (res.ret) {
        wx.navigateTo({
          url: '../feedbackSuccess/index',
        })
        this.setData({
          feedbackValue: ''
        })
      }
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