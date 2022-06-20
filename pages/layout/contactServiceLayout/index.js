Component({
  /**
   * 页面的初始数据
   */

  properties: {
    // 传入type类型判断运营专员类型
    type: {
      type: String,
      value: '',
    }
  },

  data: {
    touchStat: false,
  },

  attached() {
    console.log(this.data.type)
  },

  methods: {
    touchStart(e) {
      this.setData({
        touchStat: true,
      })
    },
    touchEnd(e) {
      this.setData({
        touchStat: false,
      })
    },
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //
    // console.log("onShow", 123)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("onLoad", 123)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    //
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