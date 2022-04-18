// pages/tax/taxRecord/index.js
const {
  declareList
} = require("../../../http/api/api_csbl")
const tempPath = getApp().globalData.imgPath;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allDeclareList: [],
    listIcon: tempPath + 'tax/taxreturn/list.png',
    dateIcon: tempPath + 'tax/taxreturn/list.png',
    title: "申报缴纳记录",
    returnType: "",
    date: '2022'
  },
  backIndex() {
    wx.navigateTo({
      url: '../taxreturn/index',
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
    console.log(event,this.data.date)
  },
  gotoDeatil(event) {
    console.log(event)
    let row = event.currentTarget.dataset.row;
    wx.setStorageSync('payRowId', row.id)
    wx.navigateTo({
      url: '../payRecordDetail/payRecordDetail?id=' + row.id,
    })
  },
  getTaxList(value) {
    let params = {
      status: 2,
      page_size: 15,
      year: value? value : this.data.date
    }
    wx.setStorageSync('pageStatus', 2)
    declareList(params).then(res => {
      if (res.ret) {
        this.setData({
          allDeclareList: res.data.list
        })
      }
      console.log(res, '列表')
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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