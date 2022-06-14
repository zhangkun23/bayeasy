// components/modal/modal.js
const tempPath = getApp().globalData.imgPath;
const {
  wechatPay,
  // wechatPayData
} = require('../../../../http/api/api')
const {
  payUrl
} = require('../../../../http/env').dev;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 标题
    title: {
      type: String,
      value: "支付"
    },
    // 金额
    money: {
      type: String,
      value: "0.00"
    },
    // 控制显示弹框
    showModal: {
      type: Boolean,
      value: false
    },
    // 控制显示弹框
    showModalToo: {
      type: Boolean,
      value: false
    },
    // icon图标
    iconSrc: {
      type: String,
      value: tempPath + "serviecFee/detail/icon_pay.png",
    },
    // 按钮文字
    btnText: {
      type: String,
      value: "确认支付"
    },
    // 订单号
    orderno: {
      type: String,
      value: ""
    },
    contents: {
      type: String,
      value: ""
    }
  },
  pageLifetimes: {
    attached() {
      console.debug("modal attached")
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    closeBtn: tempPath + "public/close-icon.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 确认支付
    topay() {
      if (this.data.title == '支付完成') {
        this.setData({
          showModal: false
        })
      } else {
        // let open_id = "olXtf42GIc3kPJZMwZ5yRKSt5a98";   // 我的
        // let open_id = "olXtf460cBzc5mW5rfjmxfRYvN68"; 
        let open_id = getApp().globalData.open_id;
        // let app_id = getApp().globalData.app_id;
        let app_id = "wx8c15bc82c287b2b7";
        if (!open_id) return;
        // 提交预订单
        let params = {
          open_id, // 用户id,后端返回
          order_no: this.data.orderno, //"F226641562563136523",// 订单号
          amount: this.data.money, // 金额
          app_id
        }
        // 提交支付
        // let payParam = {
        //   open_id, 
        //   order_no: this.data.orderno, // "F226641562563136523", // this.data.orderno, // 订单号
        //   app_id
        // }
        // 提交预支付订单
        wechatPay(params).then(res => {
          console.log(res)
          if (res.ret) {
            // 提交支付
            // wechatPayData(payParam).then(res => {
            //   if (res.ret) {
            // console.log(res.ret)
            let paymentarams = {
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: res.data.signType,
              paySign: res.data.paySign,
            }
            // 调起微信支付控件
            wx.requestPayment({
              "timeStamp": paymentarams.timeStamp + '',
              "nonceStr": paymentarams.nonceStr,
              "package": paymentarams.package,
              "signType": paymentarams.signType,
              "paySign": paymentarams.paySign,
              "success": function (res) {
                console.log(res)
                this.setData({
                  title: '支付完成',
                  btnText: '完成',
                  showModal: false
                })
                let data = {
                  title: this.data.title,
                  btnText: this.data.btnText,
                }
                this.triggerEvent("sendParent", data)

                this.triggerEvent('closeBtn')
                // if (res.ret) {
                wx.navigateTo({
                  url: '/pages/serviceFee/paymentSuccessful/index',
                })
                // }
              },
              "fail": function (res) {
                console.log(res)
                wx.navigateTo({
                  url: '/pages/serviceFee/paymentError/index',
                })
              },
              "complete": function (res) {
                console.log(res)
              }
            })
          } else {
            wx.showToast({
              title: res.message,
              icon: "none"
            })
          }
        })

        // } else {
        // console.log(this.data)
        // this.setData({
        //   title: '支付完成',
        //   btnText: '完成',
        // })
        // let data = {
        //   title: this.data.title,
        //   btnText: this.data.btnText,
        // }
        // this.triggerEvent("sendParent",data)
        // this.triggerEvent('closeBtn')
        //   }
        // })
      }
    },

    // 关闭模态框
    closeModal() {
      console.debug("modal close btn tap");
      this.setData({
        showModal: false
      })
      this.triggerEvent('closeBtn')
    }
  }
})







// timeStamp: "1654591704",
// nonceStr: "wUkoCMreYp9i1znXBSclJqjVh5O2FZ0a",
// package: "prepay_id=wx07164030792917e331152f5c8e468d0000",
// signType: "RSA",
// paySign: "F/AubPaCSCCF8gYNYK0/DCh4HLpgJRGYD7drQSq331nTTcqrLGnbLHaFys4E4oBFjqieQ+yGgm8xj0QmyxRlFnmmg46RUQUvMQOa+Jz3BL6cNH0nyrMsAZbkwtlPYikqQ9mA5SacL6dUIo/Yfy+vr4qqDPTUXg8CnqJijh+woCBDW0Wo+Dy/Ah3UJNu83cZmngREc5wrUdflS+qrqKgeQX/89LhWmvNR7hc1zMnpGeoAdrJ7cHApR6RZgERQzCfpcIwXJxboI5AxuN1B/+P+L6pmwimCRuuCszlgCE5h/6vpS5OZBXjdxcK++z5h6KR+2zkYn7nHVZmhpIrXme6OIg==",