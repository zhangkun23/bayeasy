// pages/personal/contactStaff/index.js
const {
  getOperateQR
} = require('../../http/api/api')
const {
  baseUrl
} = require('../../http/env.js').dev;
const {
  arrayBufferToBase64Img
} = require('../../utils/util')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel_num: app.globalData.phoneNumber,
    qrcode_url: '',
    tel_icon: 'https://image.bayeasy.cn/images-data/personal/icons/tel.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const that = this
    const token = wx.getStorageSync('token')
    const getQR = new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + getOperateQR(),
        method: 'get',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + token,
        },
        responseType: 'arraybuffer',
        success: res => {
          const str = arrayBufferToBase64Img(res.data)
          resolve(str)
        },
        fail: e => {
          reject(e)
        }
      })
    })
    getQR.then(res => {
       this.setData({qrcode_url: 'data:image/jpeg;base64,'+ res})
    }).catch(e=>{
      console.log("Failde to get qr code from buffer: ", e)
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

  },
  telContact() {
    wx.makePhoneCall({
      phoneNumber: this.data.tel_num //仅为示例，并非真实的电话号码
    })
  }

})