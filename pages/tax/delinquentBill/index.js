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
    totalLoanAmount: '',
    ids: [],
    showPage: false,
    returnType: ''
  },

  backIndex() { 
    if(this.data.returnType == 'todo') {
      wx.navigateTo({
        url: '../../todo/todo',
      })
    } else {
      console.log("不是todo")
    }
  },
  sureRecord() {
    wx.navigateTo({
      url: '../repaymentBill/index',
    })
  },
  // 欠款列表
  getLoanList() {
    loanList({
      page_size: 1000
    }).then(res => {
      if (res.ret) {
        let that = this;
        let arr = []
        that.setData({
          totalLoanAmount: res.data.total_loan_amount  // 欠款总金额
        })
        if (that.data.ids.length > 0) {
          that.data.ids.forEach(item => {
            res.data.list.forEach(childItem => {
              if(childItem.id == item){
                arr.push(childItem)
              }
            })
          })
          that.setData({
            isShowList: false,
            allLoanList: arr,
          })
        } else {
          that.setData({
            isShowList: true,
            allLoanList: res.data.list
          })
        }
      } else {
        that.setData({
          totalLoanAmount: '00.00'
        })
      }
      this.setData({
        showPage:true
      })
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
    //  let ids = '26_2_36'.split('_');
    //  console.log(ids)
    // if(ids.length > 0) {
    if(options.ids) {
      let ids = options.ids.split('_');
      this.setData({
        ids: ids
      })
    }
    this.setData({
      returnType: options.type
    })
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