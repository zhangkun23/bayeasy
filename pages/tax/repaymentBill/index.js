// pages/tax/repaymentBill/index.js
const tempPath = getApp().globalData.imgPath;
const {
  repaymentList
} = require('../../../http/api/api_csbl')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listIcon: tempPath + 'tax/taxreturn/list.png',
    allRepaymentList: []
  },
  backIndex() {
    wx.navigateTo({
      url: 'pages/tax/taxreturn/index',
    })
  },
  getrepaymentList() {
    repaymentList({page_size: 10}).then(res => {
      console.log(res)
      if (res.ret) {
        if(res.data.list.length > 0) {
          this.setData({
            isShowList: false,
            allRepaymentList: res.data.list,
            totalLoanAmount: res.data.total_loan_amount
          })
        } else {
          this.setData({
            isShowList: true,
            totalLoanAmount: '00.00'
          })
        }
      }
    })
  },
  gotoDeatil(event) {
    let row = event.currentTarget.dataset.row;
    console.log(row)
    wx.navigateTo({
      url: '../billingDetail/billingDetail?id=' + row.id + '&type=repaymentBill'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getrepaymentList();
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