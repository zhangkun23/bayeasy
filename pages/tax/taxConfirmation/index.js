// pages/tax/taxConfirmation/index.js

const tempPath = getApp().globalData.imgPath;
const {
  declareList
} = require("../../../http/api/api_csbl")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowList: false,
    listIcon: tempPath + 'tax/taxreturn/list.png',
    info_max: tempPath + "public/info_max.png",
    month: '2022-03',
    supplemented: '￥234.00',
    withdrawn: '￥234.00',
    empty_bg_url: tempPath + 'public/emptyBackGround.png',
    allDeclareList: [],
    title: '',
    returnType: '',
    page: 1,
    page_size: getApp().globalData.page_size,
  },

  backTaxIndex() {
    if (this.data.returnType == 'todo') {
      wx.navigateTo({
        url: '../../todo/todo',
      })
    } else {
      wx.navigateTo({
        url: '../taxreturn/index',
      })
    }
  },
  renderPage(value) {
    if (value == 'todo') {
      this.setData({
        title: '申报税款确认',
        returnType: value
      })
    } else if (value == 'pay') {
      this.setData({
        title: '申报缴纳记录',
        returnType: value
      })
    }
  },
  sureRecord() {
    wx.navigateTo({
      url: '../taxRecord/index?type=list',
    })
  },
  getTaxList(page) {
    let params = {
      status: 3,
      year: '',
      page: page ? page: this.data.page,
      page_size: this.data.page_size,
    }
    wx.setStorageSync('pageStatus', 3)
    declareList(params).then(res => {
      if (res.ret) {
        wx.hideNavigationBarLoading();
        let arr = this.data.allDeclareList;
        let newArr = arr.concat(res.data.list)
        this.setData({
          allDeclareList: newArr
        })
        console.log(newArr, '列表')
      }
    })
  },
  // 跳转详情
  gotoDeatil(event) {
    let row = event.currentTarget.dataset.row
    wx.navigateTo({
      url: '../deatil/deatil?id=' + row.id + '&type=list'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.getTaxList();
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
    console.log(789)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showNavigationBarLoading();
    let page = this.data.page + 1;
    this.setData({
      page: page
    })
    this.getTaxList(page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})