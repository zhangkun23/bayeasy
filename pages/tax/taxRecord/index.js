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
    empty_bg_url: tempPath + 'public/emptyBackGround.png',
    title: "",
    returnType: "",
    date: '2022'
  },
  backIndex() {
    if (this.data.returnType == 'list') {
      wx.navigateTo({
        url: '../taxConfirmation/index',
      })
    }  else if (this.data.returnType == 'result') {
      wx.navigateTo({
        url: '../taxreturn/index',
      })
    } else if(this.data.returnType == 'pay') {
      wx.navigateTo({
        url: '../taxreturn/index',
      })
    }
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
    this.getTaxList()
    console.log(event,this.data.date)
  },
  gotoDeatil() {
    wx.navigateTo({
      url: '../deatil/deatil?type=result',
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