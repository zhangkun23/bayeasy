// components/login-btn/login-btn.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: String,
    border: {
      type: String,
      value: ''
    },
    borderRadius: {
      type: String,
      value: '25rpx'
    },
    boxShadow: {
      type: String,
      value: ''
    },
    fontSize: {
      type: String,
      value: '34rpx;'
    },
    btnWidth: {
      type: String,
      value: '20rpx'
    },
    btnHeight: {
      type: String,
      value: '20rpx'
    },
    btnBgColor: {
      type: String,
      value: 'linear-gradient(94.38deg, #0080FF 0%, #2256FF 99.56%)'
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
    onClick() {
      console.log("click btn")
      this.triggerEvent('click', null, {})
    }
  }
})