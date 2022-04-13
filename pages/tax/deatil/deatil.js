// pages/tax/deatil/deatil.js
const tempPath = getApp().globalData.imgPath;
const {
  declareInfo
} = require('../../../http/api/api_csbl');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listIcon: tempPath + 'tax/taxreturn/list.png',
    info_max: tempPath + "public/info_max.png",
    deatilObj: {},
    detailId: 0,
    timeOut: {}, // 倒计时
    taxList: [], // 明细列表
    isShowModal: false,
    buttons: [{
      text: '取消'
    },
    {
        text: '确认'
      }
    ],
  },

  //overdue_status 0 逾期 1 未逾期
  confirmTax() {
    console.log(2131)
    this.setData({
      isShowModal: true
    })
  },
  tapDialogButton(e) {
    console.log(e)
    if(e.detail.item.text == '取消') {
      this.setData({
        isShowModal: false
      })
    } else {
      wx.navigateTo({
        url: '../successfully/index',
      })
    }
  },

  // 获取详情
  getdeclareInfo() {
    declareInfo(this.data.detailId).then(res => {
      console.log(res, '详情')
      if (res.ret) {
        let time = res.data.overdue_time
        let time1 = this.getDuration(time)
        let arr = []
        if (res.data.list.length > 0) {
          arr = res.data.list[0].list
        } else {
          arr = res.data.list
        }
        console.log(arr)
        this.setData({
          deatilObj: res.data,
          timeOut: time1,
          taxList: arr
        })
        console.log(this.data.timeOut)
      }
    })
  },

  getDuration(second) {
    var days = Math.floor(second / 86400);
    var hours = Math.floor((second % 86400) / 3600);
    var minutes = Math.floor(((second % 86400) % 3600) / 60);
    var seconds = Math.floor(((second % 86400) % 3600) % 60);
    var duration = {
      days,
      hours,
      minutes,
      seconds
    }
    return duration;
  },
  methods: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      detailId: options.id
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