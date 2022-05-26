// pages/serviceFee/index/index.js
const tempPath = getApp().globalData.imgPath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconGreenList: tempPath + '/serviecFee/icon_payList_green.png',
    iconBlueList: tempPath + '/serviecFee/icon_payList_blue.png',
    iconOrangeList: tempPath + '/serviecFee/icon_payList_orange.png',
    payStatus: '待支付'
  },
  gotodeatil() {
    wx.navigateTo({
      url: '../details/index',
    })
    // wx.requestPayment({
    //   timeStamp: '',
    //   nonceStr: '',
    //   package: 'prepay_id=12312',
    //   signType: 'MD5',
    //   paySign: '',
    //   success (res) { },
    //   fail (res) { 
    //     console.log(res)
    //   }
    // })
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