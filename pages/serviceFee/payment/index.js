// pages/serviceFee/payment/index.js
const tempPath = getApp().globalData.imgPath;
const {
  getPayType
} = require('../../../http/api/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wechat: tempPath + '/serviecFee/detail/wechat.png',
    alipay: tempPath + '/serviecFee/detail/alipay.png',
    unionPay: tempPath + '/serviecFee/detail/unionPay.png',
    loginSelect: tempPath + 'invoice/billingRecord/checked.png',
    loginUnSelect: tempPath + 'invoice/billingRecord/unchecked.png',
    info_max: tempPath + "public/info_max.png",
    isShowModal: false,
    isWechat: false,
    isAlipay: false,
    isUnionPay: false,
    unpaidmoney: '',
  },

  paymentMethod(e) {
    let key = e.currentTarget.dataset.pay;
    this.setData({
      toPay: key
    }) 
    if (key == 'wechat') {
      this.setData({
        isWechat: !this.data.isWechat,
        isAlipay: false,
        isUnionPay: false,
      })
    } else if (key == 'alipay') {
      this.setData({
        isWechat: false,
        isAlipay: !this.data.isAlipay,
        isUnionPay: false,
      })
    } else {
      this.setData({
        isWechat: false,
        isAlipay: false,
        isUnionPay: !this.data.isUnionPay,
      })
    }
  },
  // 获取上次支付方式
  getPayMethod() {
    getPayType().then(res => {
      console.log(res)
      let type = res.data.type;
      if (type == 1) {
        this.setData({
          isWechat: true
        })
      } else if (type == 2) {
        this.setData({
          isAlipay: true
        })
      } else {
        this.setData({
          isUnionPay: true
        })
      }
    })
  },
  // 一键复制
  tocopy() {
    console.log('复制地址去银行卡支付')
  },

  // 去支付
  toPay() {
    if(this.data.toPay == 'wechat') {
      console.log('调用微信接口')
      this.setData({
        isShowModal: true
      })
    } else {
      console.log('调用支付宝接口')
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      unpaidmoney: options.unpaidmoney,
      starttime: options.starttime,
      endtime: options.endtime
    })
    console.log(options)
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