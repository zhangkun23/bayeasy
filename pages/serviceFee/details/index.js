// pages/serviceFee/details/index.js
const tempPath = getApp().globalData.imgPath;
const app = getApp();
const {
  serviceFeeDeatail
} = require('../../../http/api/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconBlue: tempPath + '/serviecFee/icon_pay_blue.png',
    iconGreen: tempPath + '/serviecFee/icon_pay_green.png',
    iconOrange: tempPath + '/serviecFee/icon_pay_orange.png',
    background: tempPath + '/serviecFee/detail/paid.png',
    paymentBackground: tempPath + '/serviecFee/detail/bluepaymentbg.png',
    paymentIcon: tempPath + '/serviecFee/icon_pay_blue.png',
    info_max: tempPath + "public/info_max.png",
    hasOperate: false,
    detailObj: {}
  },
  // 联系财税管家
  contactOperate: function () {
    if (this.data.hasOperate) {
      wx.navigateTo({
        url: '../../../contactOperate/index',
      })
    } else {
      const phonenum = app.globalData.phoneNumber
      wx.makePhoneCall({
        phoneNumber: phonenum
      })
    }
  },
  // 去支付
  goToPay(e) {
    console.log(e)
    let unpaidmoney = e.currentTarget.dataset.unpaidmoney;
    let starttime = e.currentTarget.dataset.starttime;
    let endtime = e.currentTarget.dataset.endtime;
    wx.navigateTo({
      url: '../payment/index?unpaidmoney=' + unpaidmoney + '&starttime=' + starttime + '&endtime=' + endtime,
    })
  },
  // 服务费详情
  getServiceFeeDeatail() {
    let id = this.data.id;
    serviceFeeDeatail(id).then(res => {
      if (res.ret) {
        this.setData({
          detailObj: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   * 0 待支付   1 部分支付   2已支付
   */
  onLoad: function (options) {
    console.log(options)
    if (options.status == 0) {
      this.setData({
        background: tempPath + '/serviecFee/detail/tobepaid.png',
        paymentIcon: tempPath + '/serviecFee/icon_pay_orange.png',
        paymentBackground: tempPath + '/serviecFee/detail/orangepaymentbg.png',
      })
    } else if (options.status == 1) {
      this.setData({
        background: tempPath + '/serviecFee/detail/partialPayment.png',
        paymentIcon: tempPath + '/serviecFee/icon_pay_green.png',
        paymentBackground: tempPath + '/serviecFee/detail/greenpaymentbg.png',
      })
    } else {
      this.setData({
        background: tempPath + '/serviecFee/detail/paid.png',
        paymentIcon: tempPath + '/serviecFee/icon_pay_blue.png',
        paymentBackground: tempPath + '/serviecFee/detail/bluepaymentbg.png',
      })
    }
    this.setData({
      id: options.id,
      status: options.status,
      hasOperate: app.globalData.operate,
    })
    this.getServiceFeeDeatail();
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