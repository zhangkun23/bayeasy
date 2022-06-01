// components/modal/modal.js
const tempPath = getApp().globalData.imgPath;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "支付"
    },
    money: {
      type: String,
      value: "0.00"
    },
    showModal: {
      type: Boolean,
      value: false
    },
    iconSrc: {
      type: String,
      value: tempPath + "serviecFee/detail/icon_pay.png",
    },
    btnText: {
      type: String,
      value: "确认支付"
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
    topay(){
      
    },

    closeModal() {
      console.debug("modal close btn tap");
      this.setData({
        showModal: false
      })
      this.triggerEvent('closeBtn')
    }
  }
})