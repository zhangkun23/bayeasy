const tempPath = getApp().globalData.imgPath;
const {
  declareInfo,
  confirmdeclare
} = require('../../../http/api/api_csbl');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listIcon: tempPath + 'tax/taxreturn/list.png',
    info_max: tempPath + "public/info_max.png",
    deatilObj: {},
    detailId: 0 || wx.getStorageSync('detailId'),
    timeOut: {}, // 倒计时
    taxList: [], // 明细列表
    // showBtn: false,
    // didClick: true,
    time: '',
    backgroundColor: '#E5EEF7',
    boxShadow: '0rpx 0rpx 0rpx 0rpx rgba(255, 255, 255, 1)',
    // splicingStr: '(5s)',
    timestamp: '',
    title: "",
    returnType: '',
  },

  // 返回
  backIndex() {
    // 去确认为true  查看结果为false
    if (this.data.returnType == 'list') {
      if (this.data.showBtn) {
        wx.reLaunch({
          url: '../taxRecord/index?type=result',
        })
      } else {
        wx.reLaunch({
          url: '../taxConfirmation/index?typs=list',
        })
      }
    } else if (this.data.returnType == 'result') {
      wx.reLaunch({
        url: '../taxRecord/index?type=result',
      })
    }
  },
  goToCertificate() {
    wx.navigateTo({
      url: '../certificate/certificate',
    })
  },

  showToast() {
    this.setData({
      showTips: true
    })
  },
  // 获取详情
  getdeclareInfo() {
    declareInfo(this.data.detailId).then(res => {
      console.log(res, '详情')
      if (res.ret) {
        let arr = []
        if (res.data) {
          wx.setStorageSync('overdueStatus', res.data.overdue_status)
          var time = res.data.overdue_time;
          if (res.data.list.length > 0) {
            arr = res.data.list[0].list
          } else {
            arr = res.data.list
          }
          this.setData({
            deatilObj: res.data,
            taxList: arr
          })
        }
      }
    })
  },
  
  getUserId(value) {
    let id = undefined;
    if (value) {
      id = value;
      wx.setStorageSync('detailId', value);
    } else {
      id = wx.getStorageSync('detailId');
      this.setData({
        showBtn: true
      })
    }
    this.setData({
      detailId: id
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, '获取跳转页面的参数')
    this.getUserId(options.id)
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