// pages/serviceFee/components/unionPayModal/index.js
const tempPath = getApp().globalData.imgPath;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showUnionPayModal: {
      type: Boolean,
      value: false
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
    hideModal() {
      this.setData({
        showUnionPayModal: false
      })
      this.triggerEvent('closeBtn')
    },
  }
})
