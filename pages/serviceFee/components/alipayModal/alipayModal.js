// pages/serviceFee/components/alipayModal/alipayModal.js
const tempPath = getApp().globalData.imgPath;
const {
  alipayUrl
} = require('../../../../http/api/api');
Component({

  /**
   * 页面的初始数据
   */
  data: {
    alipay: tempPath + '/serviecFee/detail/alipay.png',
    copyIcon: tempPath + '/serviecFee/pay/copyBtn.png',
    progress: tempPath + '/serviecFee/pay/progress.png',
    closeBtn: tempPath + "public/close-icon.png",
    // copyUrl: "https://cs.bayeasy.cn/api/mp",
  },

  properties: {
    showModal: {
      type: Boolean,
      value: false
    },
    // 订单号
    orderno: {
      type: String,
      value: ""
    },
    // 要复制的链接
    payUrl: {
      type: String,
      value: ""
    },
  },
  methods: {
    // 复制url
    copyUrl() {
      wx.setClipboardData({
        data: this.data.payUrl,
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
    },

    
    closeModal() {
      console.debug("modal close btn tap");
      this.setData({
        showModal: false
      })
      this.triggerEvent('closeBtn')
    },
  },
})