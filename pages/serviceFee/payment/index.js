// pages/serviceFee/payment/index.js
const tempPath = getApp().globalData.imgPath;
const {
  getPayType,
  getBankInfo,
  alipayUrl
} = require('../../../http/api/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wechat: tempPath + '/serviecFee/detail/wechat.png',
    alipay: tempPath + '/serviecFee/detail/alipay.png',
    unionPay: tempPath + '/serviecFee/detail/unionPay.png',
    loginSelect: tempPath + 'invoice/billingRecord/checked.png',
    loginUnSelect: tempPath + 'invoice/billingRecord/unchecked.png',
    info_max: tempPath + "public/info_max.png",
    isShowModal: false,
    isShowModalToo: false,
    isShowPayModal: false,
    isShowUnionPay: false,
    isWechat: false,
    isAlipay: false,
    isUnionPay: false,
    showUnionPayModal: false,
    unpaidmoney: '',
    backInfo: {},
    id: "",
    title: '支付',
    btnText: '确认支付'
  },

  // 选择支付方式
  paymentMethod(e) {
    console.log(e)
    let key = e.currentTarget.dataset.pay;
    this.setData({
      toPay: key
    })
    if (key == 'wechat') {
      this.setData({
        isWechat: !this.data.isWechat,
        isAlipay: false,
        isUnionPay: false,
      })
    } else if (key == 'alipay') {
      this.setData({
        isWechat: false,
        isAlipay: !this.data.isAlipay,
        isUnionPay: false,
      })
    } else {
      this.setData({
        isWechat: false,
        isAlipay: false,
        isUnionPay: !this.data.isUnionPay,
      })
    }
  },
  // 获取上次支付方式
  getPayMethod() {
    getPayType().then(res => {
      if (res.ret) {
        let type = res.data.type;
        if (type == 1) {
          this.setData({
            isWechat: true
          })
        } else if (type == 2) {
          this.setData({
            isAlipay: true
          })
        } else {
          this.setData({
            isUnionPay: true
          })
        }
        this.setData({
          payType: type
        })
      } else {
        wx.showToast({
          title: res.message,
        })
      }
    })
  },
  // 获取银行信息
  getBankInfo() {
    getBankInfo().then(res => {
      if (res.ret) {
        if (res.data.bank_type == undefined && res.data.bank_account_name == undefined && res.data.bank_account == undefined) {
          this.setData({
            isShowUnionPay: true
          })
        } else {
          this.setData({
            isShowUnionPay: false,
            backInfo: res.data
          })
        }
      } else {
        wx.showToast({
          title: res.message,
        })
      }
    })
  },
  // 一键复制
  tocopy(e) {
    let param = [{
        name: '开户银行',
        value: this.data.backInfo.bank_type,
      },
      {
        name: '银行户名',
        value: this.data.backInfo.bank_account_name,
      },
      {
        name: '银行账号',
        value: this.data.backInfo.bank_account,
      }
    ]
    // 复制方法
    wx.setClipboardData({
      data: `${param.map(item =>`${item.name}: ${item.value}`).join("\n")}`,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功',
              icon: 'none'
            })
          }
        })

      }
    })
    this.setData({
      showUnionPayModal: true
    })
  },
  // 接受子组件传来的值
  sendParent(e) {
    this.setData({
      title: '支付完成',
      btnText: '完成',
      isShowModal: false
    })
  },

  // 去支付
  toPay() {
    if (this.data.toPay == undefined) {
      if (this.data.payType == 1) {
        this.setData({
          isShowModal: true,
        })
      } else if (this.data.payType == 2) {
        this.setData({
          isShowPayModal: true
        })
      }
    } else if (this.data.toPay == 'wechat') {
      this.setData({
        isShowModal: true,
      })
    } else {
      this.setData({
        isShowPayModal: true
      })
    }
  },
  // 获取支付宝短链接
  getAlipayUrl() {
    let param = {
      order_no: this.data.orderno
    }
    alipayUrl(param).then(res => {
      if (res.ret) {
        let url = res.data.url;
        this.setData({
          payUrl: url
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: "none"
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      unpaidmoney: options.unpaidmoney,
      starttime: options.starttime,
      endtime: options.endtime,
      orderno: options.orderno,
      id: options.id
    })
    this.getPayMethod();
    this.getAlipayUrl();
    this.getBankInfo();

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