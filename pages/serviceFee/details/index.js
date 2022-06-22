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
    headerbackground: tempPath + '/serviecFee/detail/detail_orange-1.png',
    background: tempPath + '/serviecFee/detail/detail_orange-2.png',
    paymentBackground: tempPath + '/serviecFee/detail/orange_sm_bg.png',
    paymentIcon: tempPath + '/serviecFee/icon_pay_orange.png',
    info_max: tempPath + "public/info_max.png",
    hasOperate: false,
    detailObj: {}
  },
  // 联系财税管家
  contactOperate: function () {
    if (this.data.hasOperate) {
      wx.navigateTo({
        url: '../../contactOperate/index',
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
    let unpaidmoney = e.currentTarget.dataset.unpaidmoney;
    let starttime = e.currentTarget.dataset.starttime;
    let endtime = e.currentTarget.dataset.endtime;
    let orderno = e.currentTarget.dataset.orderno;
    if (!unpaidmoney) {
      unpaidmoney = ''
    } else if (!starttime) {
      starttime = ''
    } else if (!endtime) {
      endtime = ''
    } else if (!orderno) {
      orderno = ''
    }
    wx.navigateTo({
      url: '../payment/index?unpaidmoney=' + unpaidmoney + '&starttime=' + starttime + '&endtime=' + endtime + '&orderno=' + orderno + '&currentid=' + this.data.currentid,
    })
  },
  // 服务费详情
  getServiceFeeDeatail() {
    serviceFeeDeatail(this.data.currentid).then(res => {
      if (res.ret) {
        this.showBackground(res.data.order_status)
        this.setData({
          detailObj: res.data
        })
      } else {
        wx.showToast({
          title: res.message,
        })
      }
    })
  },
  // 判断背景颜色
  showBackground(status) {
    if (status == 0) {
      this.setData({
        headerbackground: tempPath + '/serviecFee/detail/detail_orange-1.png',
        background: tempPath + '/serviecFee/detail/detail_orange-2.png',
        paymentIcon: tempPath + '/serviecFee/icon_pay_orange.png',
        paymentBackground: tempPath + '/serviecFee/detail/orange_sm_bg.png',
      })
    } else if (status == 1) {
      this.setData({
        headerbackground: tempPath + '/serviecFee/detail/detail_green-1.png',
        background: tempPath + '/serviecFee/detail/detail_green-2.png',
        paymentIcon: tempPath + '/serviecFee/icon_pay_green.png',
        paymentBackground: tempPath + '/serviecFee/detail/green_sm_bg.png',
      })
    } else if (status == 2) {
      this.setData({
        headerbackground: tempPath + '/serviecFee/detail/detail_blue-1.png',
        background: tempPath + '/serviecFee/detail/detail_blue-2.png',
        paymentIcon: tempPath + '/serviecFee/icon_pay_blue.png',
        paymentBackground: tempPath + '/serviecFee/detail/blue_sm_bg.png',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   * 0 待支付   1 部分支付   2已支付
   */
  onLoad: function (options) {
    this.setData({
      currentid: options.currentid,
      status: options.status,
      hasOperate: app.globalData.operate, // 是否有运营专员
    })
    this.getServiceFeeDeatail();

    if (options.status) {
      this.showBackground(options.status);
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