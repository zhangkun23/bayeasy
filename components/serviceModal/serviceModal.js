// components/serviceModal/serviceModal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showModal: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 拨打400电话
    callNumber() {
      wx.makePhoneCall({
        phoneNumber: getApp().globalData.phoneNumber
      })
    },

    // 在线客服
    onlineService() {
      // try {
      wx.openCustomerServiceChat({
        extInfo: {
          url: 'https://work.weixin.qq.com/kfid/kfce422b23bb53f9f88' //客服ID
        },
        corpId: 'ww27f8369976a0c9de', //企业微信ID
        success(res) {
          console.log(res)
        }
      })
      // } catch (error) {
      //   showToast("请更新至微信最新版本")
      // }
    },

    hideModal() {
      this.setData({
        showModal: false
      })
      this.triggerEvent('closeBtn')
    },
  }
})