// pages/tax/taxreturn/index.js
const tempPath = getApp().globalData.imgPath;

Component({

  /**
   * 页面的初始数据
   */
  data: {
    icon1: tempPath + 'tax/taxreturn/icon1.png',
    icon2: tempPath + 'tax/taxreturn/icon2.png',
    icon3: tempPath + 'tax/taxreturn/icon3.png',
  },


  methods: {
    taxConfirmation() {
      wx.navigateTo({
        url: '../taxConfirmation/index?type=list',
      })
    },
    paymentRecord() {
      wx.navigateTo({
        url: '../paymentRecord/index',

      })
    },
    delinquentBill() {
      wx.navigateTo({
        url: '../delinquentBill/index',
      })
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

  }
})