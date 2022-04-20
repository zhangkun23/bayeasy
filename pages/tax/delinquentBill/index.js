// pages/tax/delinquentBill/index.js
const tempPath = getApp().globalData.imgPath;

const {
  loanList
} = require('../../../http/api/api_csbl')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listIcon: tempPath + 'tax/taxreturn/list.png',
    empty_bg_url: tempPath + 'public/emptyBackGround.png',
    isShowList: false,
    allLoanList: [],
    totalLoanAmount: ''
  },

  sureRecord() {
    wx.navigateTo({
      url: '../repaymentBill/index',
    })
  },
  // 欠款列表
  getLoanList() {
    loanList({
      page_size: 10
    }).then(res => {
      console.log(res)
      if (res.ret) {
        this.setData({
          totalLoanAmount: res.data.total_loan_amount
        })
        if (res.data.list.length > 0) {
          this.setData({
            isShowList: false,
            allLoanList: res.data.list,
          })
        } else {
          this.setData({
            isShowList: true,
          })
        }
      } else {
        this.setData({
          totalLoanAmount: '00.00'
        })
      }
    })
  },
  gotoDeatil(event) {
    let row = event.currentTarget.dataset.row;
    wx.navigateTo({
      url: '../billingDetail/billingDetail?id=' + row.id + '&type=delinquentBill'
    })
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
    this.getLoanList();
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