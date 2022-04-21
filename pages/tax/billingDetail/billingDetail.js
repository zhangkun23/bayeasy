const tempPath = getApp().globalData.imgPath;
const {
  declareLoanInfo,
  confirmdeclare
} = require('../../../http/api/api_csbl');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listIcon: tempPath + 'tax/taxreturn/list.png',
    info_max: tempPath + "public/info_max.png",
    billingDetailId: 0,
    taxList: [], // 明细列表
    showList: false,
    showOpen: "展开",
    title: "",
    returnType: '',
    repaymentInfo: {}, //还款详情
    loanInfo: {}, // 欠款详情
    billingDetail: [], // 欠款或还款税种明细
    declare_month: '',
  },

  // 返回
  backIndex() {
    if (this.data.returnType == 'delinquentBill') {
      if (this.data.showBtn) {
        wx.navigateTo({
          url: '../delinquentBill/index',
        })
      }
    } else if (this.data.returnType == 'repaymentBill') {
      wx.navigateTo({
        url: '../repaymentBill/index',
      })
    } else if(this.data.returnType == 'todo') {
      wx.navigateTo({
        url: '../../todo/todo',
      })
    }
  },
  goToCertificate() {
    if (this.data.returnType == 'delinquentBill') {
      wx.navigateTo({
        url: '../certificate/certificate?id=' + this.data.billingDetailId + '&type=delinquentBill',
      })
    } else if (this.data.returnType == 'repaymentBill') {
      wx.navigateTo({
        url: '../certificate/certificate?id=' + this.data.billingDetailId + '&type=repaymentBill',
      })
    }

  },
  // 展开
  showList(event) {
    this.showOrHide(event, false)
  },

  // 收起
  hideList(event) {
    this.showOrHide(event, true)
  },
  showOrHide(event, type) {
    let row = event.currentTarget.dataset.row;
    this.data.billingDetail.map(item => {
      if (item.index == row.index) {
        item.showChildList = type
      }
    })
    this.setData({
      billingDetail: this.data.billingDetail
    })
  },

  // 获取详情
  getdeclareInfo() {
    declareLoanInfo(this.data.billingDetailId).then(res => {
      console.log(res, '详情')
      if (res.ret) {
        if (res.data.detail) {
          res.data.detail.map((item, i) => {
            item.showChildList = true,
              item.index = i + 1
          })
          this.setData({
            declare_month: res.data.declare_month,
            loanInfo: res.data.loan_info,
            repaymentInfo: res.data.repayment_info,
            billingDetail: res.data.detail
          })
        } else {
          console.log(122)
        }
      }
    })
  },

  getUserId(value) {
    let id = undefined;
    if (value) {

    } else {
      id = wx.getStorageSync('detailId');
      this.setData({
        showBtn: true
      })
    }
    this.setData({
      billingDetailId: id
    })
  },
  // 设置type区分欠款还款页面
  renderPage(value) {
    if (value == 'delinquentBill' || value == 'todo') {
      this.setData({
        title: '欠款详情',
        returnType: value
      })
    } else if (value == 'repaymentBill') {
      this.setData({
        title: '还款详情',
        returnType: value
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, '获取跳转页面的参数')
    this.setData({
      billingDetailId: options.id
    })
    // this.renderPage('todo');
    this.renderPage(options.type);
    this.getUserId(options.id)
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
    console.log('onshow')
    this.getdeclareInfo();
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