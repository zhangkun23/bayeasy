// pages/tax/businessAnnualReport/list/list.js
const tempPath = getApp().globalData.imgPath;
const { annualReportList } = require("../../../../http/api/api_csbl");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listOrangeIcon: tempPath + 'tax/businessAnnual/list_icon_orange.png',
    listBlueIcon: tempPath + 'tax/businessAnnual/list_icon_blue.png',
    empty_bg_url: tempPath + 'public/emptyBackGround.png',
    list: [],
    listBlueShow: '#C2DFFF',
    listOrangeShow: '#EE7D00',

  },

  gotodetail(e) {
    let row = e.currentTarget.dataset.row;
    wx.navigateTo({
      url: '../detail/detail?id=' + row.id,
    })
  },

  getBusinessAnnualReport() {
    annualReportList().then(res => {
      if(res.ret) {
        this.setData({
          list: res.data.list
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBusinessAnnualReport()
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