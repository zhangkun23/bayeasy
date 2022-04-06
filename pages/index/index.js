const {
  login,
  todolist
} = require('../../http/api/api.js')
const tempPath = getApp().globalData.imgPath;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      imgpath:tempPath + 'footer/null.png',
      banner: tempPath + 'index/banner.png',
      logo_byz: tempPath + 'public/logo_byz.png',
      cbfy: tempPath + 'index/cbfy.png',
      faq: tempPath + 'index/faq.png',
      nssb: tempPath + 'index/nssb.png',
      srzdfp: tempPath + 'index/srzdfp.png',
      zcjc: tempPath + 'index/zcjc.png',
      fwjs: tempPath + 'index/fwjs.png',
      daiban: tempPath +'index/daiban.png',
      dbNum:0, //待办数量
      daibanShow:true,
      token:'',
      showModal:true
    },
    goLogin(){
      wx.navigateTo({
        url: '/pages/login/login/index',
      })
    },
    handelClickLogin(){
      wx.navigateTo({
        url: '../login/login/index',
      })
    },
    handelClick() {
      wx.navigateTo({
        url: '../login/authentication/index',
      })
    },
    // 待办跳转
    handelClickQqr(){
        wx.navigateTo({
          url: '../todo/todo',
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      this.setData({
        dbNum:getApp().globalData.todolistNum,
        token:wx.getStorageSync('token')
      }) 
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