// pages/tax/businessAnnualReport/detail/detail.js

const tempPath = getApp().globalData.imgPath;
const {
  annualReportInfo
} = require('../../../../http/api/api_csbl')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendByPost: tempPath + 'tax/businessAnnual/sendByPost.png',
    pdf_icon: tempPath + 'tax/businessAnnual/pdf_icon.png',
    loginSelect: tempPath + 'invoice/billingRecord/checked.png',
    loginUnSelect: tempPath + 'invoice/billingRecord/unchecked.png',
    businessAnnualObj: {}
  },
  // 下载工商年报
  gotoDownloadReport() {
    // wx.navigateTo({
    //   url: '../download/index',
    // })
  },

  checkedDownload(e) {
    let data = this.data.businessAnnualObj.report_file;
    console.log(data)
    let id = e.currentTarget.dataset.id;
    data.map(item => {
      if (id == item.id) {
        item.checked = !item.checked
      }
    })
    this.setData({
      businessAnnualObj: {
        ...this.data.businessAnnualObj,
        report_file: data
      }
    })
  },

  getDeatail(id) {
    annualReportInfo(id).then(res => {
      if (res.ret) {
        let reportfFle = res.data.report_file;
        reportfFle.map(item => {
          item.checked = false;
          item.title = '2021年工商年度报告书1.pdf'
        })
        this.setData({
          businessAnnualObj: res.data
        })
        console.log(this.data.businessAnnualObj)

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDeatail(options.id)
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