// pages/tax/deatil/deatil.js
const tempPath = getApp().globalData.imgPath;
const {
  declareInfo,
  confirmdeclare
} = require('../../../http/api/api_csbl');
const {
  getUserStatus,
} = require('../../../http/api/api.js');
const {
  dateToStr
} = require('../../../utils/util')
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
    // showBigIcon: false,  
    showService: false,  
    buttons: [{
        text: '取消'
      },
      {
        text: '确认'
      }
    ],
  },
  // 页面滚动开始
  touchstartFn(e) {
    console.log('开始滚动', e)

  },
  //  页面滚动结束
  touchendFn(e) {
    console.log('滚动结束', e)
  },

  hideTips() {
    this.setData({
      showTips: false
    })
  },
  // 返回
  backIndex() {
    console.log(123)
    wx.setStorageSync('overdueStatus', '')

  },
  // getUserStatus() {
  //   getUserStatus().then(res => {
  //     console.log(res,this.data.deatilObj)
  //     if (res.ret) {
  //       this.setData({
  //         deatilObj:{
  //           // status: res.data.status
  //         }
  //       })
  //       // getApp().globalData.userStatus = res.data.status;
  //     }
  //   })
  // },

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
      console.log(this.data.taxPayable)
      if (this.data.time == 1) {
        // confirmdeclare({
        //   id: this.data.detailId
        // }).then(res => {
        //   if (res.ret) {
        //     // 确认无误之后跳转到结果页  此时需要隐藏弹出框
        //     this.setData({
        //       isShowModal: false,
        //       returnType: 'result',
        //       title: '申报纳税确认记录',
        //       showBtn: true
        //     })
        //     setTimeout(() => {
        let that = this;

        confirmdeclare({
          id: this.data.detailId
        }).then(res => {
          if (res.ret) {
            that.setData({
              isShowModal: false,
              returnType: 'result',
              title: '申报纳税确认记录',
              showBtn: true
            }, () => {
              wx.navigateTo({
                url: '../successfully/index?typs=list&id=' + that.data.detailId + '&shouldPayTax=' + that.data.taxPayable,
                events: {
                  taxConfirmed: function () {
                    const dateStr = dateToStr(new Date())
                    let dObj = that.data.deatilObj
                    dObj.confirm_date = dateStr
                    dObj.status
                    that.setData({
                      deatilObj: dObj
                    })
                  },
                }
              })
            })

          }
        })

        //     }, 100)
        //   }
        // })
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
    let id = wx.getStorageSync('rowid')
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
            this.setData({
              title: '申报税款确认'
            })
          }
          var time = res.data.overdue_time;
          this.countDown(time)
          if (res.data.list) {
            arr = res.data.list
          }
          // console.log(res.data)
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
    console.log(value)
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
   * 如果传参带id则为单挑详情页
   */
  onLoad: function (options) {
    console.log(options);
    if (options.id) {
      this.setData({
        detailId: options.id
      })
    }
    wx.setStorageSync('rowid', options.id)
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