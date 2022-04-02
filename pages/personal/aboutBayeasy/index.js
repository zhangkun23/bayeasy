// pages/personal/aboutBayeasy/index.js
const {icons_url} = require('../config/config')
const utils = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    right_arrow: icons_url.right_arrow,
    entrances:[
      {
        title: '服务介绍',
        url: '',
      },{
        title: '服务协议',
        url: '',
      },{
        title: '隐私协议',
        url: '',
      },{
        title: '营业执照',
        url: '',
      },
    ],
     pdf_list: {
       platform:'service_agreement',
      privact: 'privacy_policy',
      intro: 'manual'
     }
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

  },
  goEntrance(){
    console.log("go ! ")
  }
})