
const tempPath = getApp().globalData.imgPath;
const {
  declareLoanInfo
} = require('../../../http/api/api_csbl');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listIcon: tempPath + 'tax/taxreturn/list.png',
    info_max: tempPath + "public/info_max.png",
    deatilObj: {},
    repaymentBillId: 0 ,
    taxList: [], // 明细列表
    isShowModal: false,
    showBtn: false,
    didClick: true,
    returnType: '',
  },

  // 返回
  backIndex() {
    wx.navigateTo({
      url: '../paymentRecord/index',
    })
    // 去确认为true  查看结果为false
    // if (this.data.returnType == 'list') {
    //   if (this.data.showBtn) {
    //     wx.reLaunch({
    //       url: '../taxRecord/index?type=result',
    //     })
    //   } else {
    //     wx.reLaunch({
    //       url: '../taxConfirmation/index?typs=list',
    //     })
    //   }
    // } else if (this.data.returnType == 'result') {
    //   wx.reLaunch({
    //     url: '../taxRecord/index?type=result',
    //   })
    // }
  },

  //overdue_status 0 逾期 1 未逾期
  confirmTax() {
    if (this.data.didClick) {
      this.setData({
        isShowModal: true
      })
    } else {
      return
    }

  },
  tapDialogButton(e) {
    // console.log(e)
    if (e.detail.item.text == '取消') {
      this.setData({
        isShowModal: false
      })
    } else {
      let params = {
        id: wx.getStorageSync('payRowId')
      }
      if (this.data.time == 1) {
        // confirmdeclare(params).then(res => {
        //   console.log(res)
        //   if (res.ret) {
        wx.navigateTo({
          url: '../successfully/index?typs=list',
        })
        //   }
        // })
      }
    }
  },
  addTaxItem() {

  },
  showToast() {
    this.setData({
      showTips: true
    })
  },
  // 获取详情
  getdeclareInfo() {
    declareLoanInfo({ id: this.data.repaymentBillId }).then(res => {
      console.log(res, '详情')
      // if (res.ret) {
      //   let arr = []
      //   if (res.data) {
      //     wx.setStorageSync('overdueStatus', res.data.overdue_status)
      //     if (res.data.list.length > 0) {
      //       arr = res.data.list[0].list
      //     } else {
      //       arr = res.data.list
      //     }
      //     this.setData({
      //       deatilObj: res.data,
      //       taxList: arr
      //     })
      //   }
      // }
    })
  },
  renderPage(value) {
    if (value == 'list') {
      this.setData({
        title: '本期申报税款确认',
        returnType: value
      })
    } else if (value == 'result') {
      this.setData({
        title: '申报税款确认记录',
        returnType: value
      })
    }
  },
  methods: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, '获取跳转页面的参数')
    this.setData({
      repaymentBillId: options.id
    })
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