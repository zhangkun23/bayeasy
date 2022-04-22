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
    showTime: true,
    time: '',
    backgroundColor: '#E5EEF7',
    boxShadow: '0rpx 0rpx 0rpx 0rpx rgba(255, 255, 255, 1)',
    splicingStr: '(5s)',
    timestamp: '',
    title: "",
    returnType: '',
    taxPayable: '',
    buttons: [{
        text: '取消'
      },
      {
        text: '确认'
      }
    ],
  },
  hideTips() {
    this.setData({
      showTips: false
    })
  },
  // 返回
  backIndex() {
    wx.setStorageSync('overdueStatus', '')

    // wx.navigateBack({
    //   delta: 1,
    // })
    // return
    // 去确认为true  查看结果为false
    // if (this.data.returnType == 'list') {
    //   console.log(222)
    //   if (this.data.showBtn) {
    //     wx.navigateTo({
    //       url: '../taxRecord/index?type=result',
    //     })
    //     // wx.navigateBack()
    //   } else {
    //     wx.navigateTo({
    //       url: '../taxConfirmation/index?typs=list',
    //     })
    //   }
    // } else if (this.data.returnType == 'result') {



    // if (this.data.returnType == 'result') {



    //   wx.navigateTo({
    //     url: '../taxRecord/index?type=result',
    //   })
    // }
    // } else if(this.data.returnType == 'todo') {
    //   wx.navigateTo({
    //     url: '../../todo/todo',
    //   })
    // }
  },

  //overdue_status 0 逾期 1 未逾期
  confirmTax() {
    if (this.data.didClick) {
      this.setData({
        isShowModal: true
      })
    }
  },
  tapDialogButton(e) {
    if (e.detail.item.text == '取消') {
      this.setData({
        isShowModal: false
      })
    } else {
      if (this.data.time == 1) {
        confirmdeclare({
          id: this.data.detailId
        }).then(res => {
          if (res.ret) {
            // 确认无误之后跳转到结果页  此时需要隐藏弹出框
            this.setData({
              isShowModal: false,
              returnType: 'result',
              title: '申报纳税确认记录',
              showBtn: true
            })
            setTimeout(() => {
              wx.navigateTo({
                url: '../successfully/index?typs=list&id=' + this.data.detailId + '&shouldPayTax=' + this.data.taxPayable,
              })
            }, 100)
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
      // console.log(res, '详情')
      if (res.ret) {
        let arr = []
        if (res.data) {
          wx.setStorageSync('overdueStatus', res.data.overdue_status)

          if (res.data.overdue_status == 1) {
            this.setData({
              title: '本期申报税款确认'
            })
          } else {
            title: '申报税款确认'
          }
          var time = res.data.overdue_time;
          this.countDown(time)
          if (res.data.list) {
            arr = res.data.list
          }
          this.setData({
            deatilObj: res.data,
            taxList: arr,
            // showTime: true,
            taxPayable: res.data.should_pay_tax
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
    this.setData({
      timeOut: this.getDuration(seconds),
    })
    let timer = setInterval(() => {
      seconds--
      let result = type == 1 ? seconds : this.getDuration(seconds)
      this.setData({
        timeOut: result,
      })

      if (seconds <= 0) {
        clearInterval(timer)
        console.log('倒计时结束，清除定时器，避免内存溢出')
      }
    }, 1000)    
  },

  // 确认是否已逾期 0 逾期 1未逾期   overdueStatus逾期状态
  renderPage(value) {
    this.setData({
      returnType: value
    })
    if (value == 'list') {
      if (wx.getStorageSync('overdueStatus') == 1) {
        this.setData({
          title: '本期申报税款确认',
        })
      } else {
        this.setData({
          title: '申报税款确认'
        })
      }
    } else if (value == 'result') {
      this.setData({
        title: '申报税款确认记录',
        returnType: value,
        showBtn: true
      })
    }
  },
  methods: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        detailId: options.id
      })
    }
    this.getdeclareInfo();
    this.renderSecon();
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