// components/contactService/contactService.js
const tempPath = getApp().globalData.imgPath;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showService: {
      type: Boolean,
      value: false
    },
    showBigIcon: {
      type: Boolean,
      value: false
    },
  },

  methods: {
    getParams() {
      wx.getSystemInfo({
        success: function (res) {
          console.log(res);
          // 屏幕宽度、高度
          console.log('height=' + res.windowHeight);
          console.log('width=' + res.windowWidth);
          // 高度,宽度 单位为px
          that.setData({
            windowHeight: res.windowHeight,
            windowWidth: res.windowWidth,
            buttonTop: res.windowHeight * 0.70, //这里定义按钮的初始位置
            buttonLeft: res.windowWidth * 0.70, //这里定义按钮的初始位置
          })
        }
      })
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgSrc: tempPath + 'public/icon__figure.png',
  },



  /**
   * 组件的方法列表
   */
  methods: {

  }
})