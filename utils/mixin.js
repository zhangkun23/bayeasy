module.exports = Behavior({
  //私有数据节点

  data: {},


  //属性节点

  properties: {},

  attached() {
    console.log(123, '混入')
  },

  //事件处理

  methods: {
    // 发送给父组件
    sendCurrentStatus() {
      this.aaa()
    },

   

    // 获取页面高度
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
  }
})