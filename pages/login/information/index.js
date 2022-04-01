// pages/login/information/index.js
Component({

  /**
   * 页面的初始数据
   */
  data: {
    isShowModal: false,
    form: {
      usernam: "哈哈哈",
      telephone: "19067896789",
      idcard: "234567199001010987",
    },
    showIdcardFront: true,
    showIdcardResever: true,
    showClose: false, 
    buttons:[
      {text:'我知道了'}
    ],
    front: "拍摄身份证正面",
    resever: "拍摄身份证反面",
  },

  methods: {
    confirmSubmit() {
      this.setData({
        isShowModal:true
      })
    },
    uploadIdcard(e) {
      const params = e.currentTarget.dataset;
      console.log("ddd")
    },
    tapDialogButton(e) {
      console.log(e.detail)
      this.setData({
        isShowModal: false
      })
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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