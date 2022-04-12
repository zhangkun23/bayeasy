// pages/tax/deatil/deatil.js
const tempPath = getApp().globalData.imgPath;
const {
  declareInfo
} = require('../../../http/api/api_csbl');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listIcon: tempPath + 'tax/taxreturn/list.png',
    info_max: tempPath + "public/info_max.png",
    day: "1",
    hours: "20",
    minute: "20",
    second: "20",
    deatilObj: {},
    detaiId: 0 ,
  },

  //overdue_status 0 逾期 1 未逾期
  confirmTax() {
    console.log(2131)
  },

  getdeclareInfo() {
    declareInfo(this.data.detaiId).then(res => {
      console.log(res, '详情')
      if (res.ret) {
        this.setData({
          deatilObj: res.data
        })
      }
    })
  },
  methods: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      detaiId: options.id
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
    console.log('onshow')
    this.getdeclareInfo();

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