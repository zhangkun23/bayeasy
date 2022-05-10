// pages/tax/taxRecord/index.js
const {
  declareList, getFullYear
} = require("../../../http/api/api_csbl")
const tempPath = getApp().globalData.imgPath;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allDeclareList: [],
    listIcon: tempPath + 'tax/taxreturn/list.png',
    dateIcon: tempPath + 'tax/taxreturn/date.png',
    empty_bg_url: tempPath + 'public/emptyBackGround.png',
    title: "申报缴纳记录",
    returnType: "",
    date: '',
    startTime: '',
    endTime: ''
  },
  backIndex() {
    // wx.reLaunch({
    //   url: '../taxreturn/index',
    // })
  },
  getYaer() {
    let date = new Date();
    let year = date.getFullYear();
    this.setData({
      endTime: year,
      date:year
    })
    getFullYear().then(res => {
      if(res.ret) {
        this.setData({
          startTime: res.data.year
        })
      }
    })
  },
  renderPage(value) {
    if (value == 'list'|| value == 'result') {
      this.setData({
        title: '申报税款确认记录',
        returnType: value
      })
    } else if (value == 'pay') {
      this.setData({
        title: '申报缴纳记录',
        returnType: value
      })
    }
  },
  // 选择年
  bindDateChange(event){
    this.setData({
      date: event.detail.value
    })
    this.getTaxList(event.detail.value)
  },
  gotoDetail(event) {
    let row = event.currentTarget.dataset.row;
    wx.setStorageSync('payRowId', row.id)
    wx.navigateTo({
      url: '../payRecordDetails/payRecordDetails?id=' + row.id,
    })
  },
  getTaxList(value) {
    let params = {
      status: 3,
      page_size: 1000,
      year: value? value : this.data.date
    }
    wx.setStorageSync('pageStatus', 2)
    declareList(params).then(res => {
      if (res.ret) {
        this.setData({
          allDeclareList: res.data.list
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getYaer();
    this.getTaxList();
    this.renderPage(options.type)
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