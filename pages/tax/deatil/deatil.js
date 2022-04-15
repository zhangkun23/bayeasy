// pages/tax/deatil/deatil.js
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
    isShowModal: false,
    showBtn: false,
    didClick: true,
    time: '',
    backgroundColor: '#E5EEF7',
    boxShadow: '0rpx 0rpx 0rpx 0rpx rgba(255, 255, 255, 1)',
    splicingStr: '(5s)',
    timestamp: '',
    buttons: [{
        text: '取消'
      },
      {
        text: '确认'
      }
    ],
  },

  // 返回
  backIndex() {
    // 去确认为true  查看结果为false
    if (this.data.showBtn) {
      wx.navigateTo({
        url: '../taxRecord/index',
      })
    } else {
      wx.navigateTo({
        url: '../taxConfirmation/index',
      })
    }
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
        id: wx.getStorageSync('detailId')
      }
      console.log(this.data.time)
      if (this.data.time == 1) {
        confirmdeclare(params).then(res => {
          console.log(res)
          if (res.ret) {
            wx.navigateTo({
              url: '../successfully/index',
            })
          }
        })

      }
    }
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
          var time = res.data.overdue_time;
          this.countDown(time)
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
  // 秒转换为天时分秒
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
  // 确认税金倒计时
  renderSecon() {
    let time = 5;
    let str = ''
    let timer = setInterval(() => {
      time--;
      if (time > 0) {
        str = '(' + time + 's)'
        this.setData({
          time: time,
          splicingStr: str,
          didClick: false,
        })
      } else {
        this.setData({
          splicingStr: '',
          didClick: true,
          backgroundColor: '#1D83F0;',
          boxShadow: '0rpx 30rpx 50rpx 0rpx rgba(29, 131, 240, 0.2);'
        })
      }
      if (time <= 0) {
        clearInterval(timer)
      }
    }, 1000);
  },

  /**
   * 倒计时
   * @param {*} type 类型 0-给定具体多少秒倒计时（默认）；1-给定目标结束时间戳，单位为秒，目标是转换为“xx秒后结束”的格式
   * @param {*} timestamp 当type==0时表示具体秒数，默认60；type==1时为目标结束时间戳，目标是转换为“xx天xx小时xx分xx秒”的格式
   */
  countDown(timestamp, type) {
    let seconds = timestamp // 倒计时总秒数
    if (type == 1) {
      let currentTimestamp = Math.round(new Date() / 1000) // 当前时间戳，单位秒
      seconds = timestamp - currentTimestamp
    }
    // 如果目标时间小于等于当前时间，不需要继续进行了
    if (seconds <= 0) return
    // 定时器
    let timer = setInterval(() => {
      seconds--
      let result = type == 1 ? seconds : this.getDuration(seconds)
      this.setData({
        timeOut: result
      })
      if (seconds <= 0) {
        clearInterval(timer)
        console.log('倒计时结束，清除定时器，避免内存溢出')
      }
    }, 1000)
  },

  methods: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.renderSecon();
    this.countDown(this.data.timestamp);
    let id = undefined;
    if (options.id) {
      id = options.id;
      wx.setStorageSync('detailId', options.id);
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