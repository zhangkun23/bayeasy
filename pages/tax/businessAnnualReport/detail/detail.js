// pages/tax/businessAnnualReport/detail/detail.js

const tempPath = getApp().globalData.imgPath;
const {
  annualReportInfo
} = require('../../../../http/api/api_csbl');
const {
  openPdf
} = require('../../../../utils/util')
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
    let arr = [];
    let data = this.data.businessAnnualObj.report_file;
    data.map(item => {
      if (item.checked) {
        arr.push(item.id)
      }
    })
    if (arr.length < 1) {
      wx.showToast({
        title: '请选择要下载的工商年报',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../download/index?ids=' + arr + '&currentId=' + this.data.currentId,
      })
    }
  },

  // 切换是否选中
  checkedDownload(e) {
    let data = this.data.businessAnnualObj.report_file;
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
    this.updateAllStatus(this.data.businessAnnualObj.report_file)
  },
  // 单选某一item时 是否设置全选
  updateAllStatus(data) {
    let tempNum = 0;
    let size = data.length;
    data.map(item => {
      if (item.checked) ++tempNum
    })
    this.setData({
      isShowCheckedAll: tempNum == size
    })
  },
  // 全选
  checkedAll() {
    this.setData({
      isShowCheckedAll: !this.data.isShowCheckedAll
    })
    let data = this.data.businessAnnualObj.report_file;
    if (this.data.isShowCheckedAll) {
      data.map(item => {
        item.checked = true;
      })
    } else {
      data.map(item => {
        item.checked = false;
      })
    }
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
        })
        this.setData({
          businessAnnualObj: res.data
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    })
  },
  // 打开pdf文件
  goEntrance(e) {
    openPdf(e.currentTarget.dataset.url, 'uploadPdf')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentId: options.id
    })
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