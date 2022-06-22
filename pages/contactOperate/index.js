// pages/personal/contactStaff/index.js
// const {
//   getOperateQR
// } = require('../../http/api/api')
const {
  get_operate
} = require('../../http/api/api_grzx')
// const {
//   baseUrl
// } = require('../../http/env.js').dev;
// const {
//   arrayBufferToBase64Img
// } = require('../../utils/util')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel_num: app.globalData.phoneNumber,
    qrcode_url: '',
    tel_icon: app.globalData.imgPath + 'personal/icons/tel.png',
    customer_service: app.globalData.imgPath + 'public/customer_service.png',
    showModal: false,
    isShowImg: false
  },
  telContact() {
    this.setData({
      showModal: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, '个人中心联系客服')
    if (options.wechat_img) {
      this.setData({
        qrcode_url: options.wechat_img,
        isShowImg: true
      })
    } else {
      this.setData({
        isShowImg: false,
        qrcode_url: ''
      })
    }


    // const that = this
    // const token = wx.getStorageSync('token')
    // const getQR = new Promise((resolve, reject) => {
    //   wx.request({
    //     url: baseUrl + getOperateQR(),
    //     method: 'get',
    //     header: {
    //       'content-type': 'application/x-www-form-urlencoded',
    //       'Authorization': 'Bearer ' + token,
    //     },
    //     responseType: 'arraybuffer',
    //     success: res => {
    //       const str = arrayBufferToBase64Img(res.data)
    //       resolve(str)
    //     },
    //     fail: e => {
    //       reject(e)
    //     }
    //   })
    // })
    // get_operate().then(res => {
    //   // const str = arrayBufferToBase64Img(res.data)
    //   console.debug("qr code res", res)
    //   if (res.ret) {
    //     if (res.data instanceof Object && res.data.hasOwnProperty('image')) {
    //       this.setData({
    //         qrcode_url: res.data.image
    //       })
    //     } else {
    //       wx.showToast({
    //         title: '无法获取二维码',
    //         icon: 'none'
    //       })
    //     }
    //   } else {
    //     console.error("Failed to get QR ", res.message)
    //   }

    // }).catch(e => {
    //   console.log("Failed to get qr code from request: ", e)
    // })
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

  },


})