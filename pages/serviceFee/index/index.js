// pages/serviceFee/index/index.js
const tempPath = getApp().globalData.imgPath;
const {
  getPayList
} = require('../../../http/api/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconGreenList: tempPath + '/serviecFee/icon_payList_green.png',
    iconBlueList: tempPath + '/serviecFee/icon_payList_blue.png',
    iconOrangeList: tempPath + '/serviecFee/icon_payList_orange.png',
    empty_bg_url: tempPath + 'public/emptyBackGround.png',
    payStatus: '待支付',
    isShowList: false,
    payList: []
  },

  gotodeatil(e) {
    let row = e.currentTarget.dataset.row;
    wx.navigateTo({
      url: '../details/index?id=' + row.id + '&status=' + row.order_status,
    })
  },
  // 列表
  getPaymentList() {
    let params = {
      page: 1,
      page_size: 100
    }
    getPayList(params).then(res => {
      if (res.ret) {
        this.setData({
          payList: res.data.list
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: "none"
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPaymentList();
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