const tempPath = getApp().globalData.imgPath;
const utils = require('../../utils/util.js')
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
      showModal:false,
      textInfo:'登录/注册',
    },
    goLogin(){
      let userStatus = getApp().globalData.userStatus;  //用户状态 0 不为贝易资用户, 1 为贝易资用户未关联信息,2 已关联
      if(this.data.textInfo == '登录/注册'){
        utils.navigateTo('/pages/login/login/index')
      }else{
        if(userStatus == 1){
          utils.navigateTo('/pages/login/securityCheck/index')
        }else if(userStatus!=1){
          utils.navigateTo('/pages/login/information/index')
        }
      }
    },
    // 登录与完善个人信息按钮直接跳
    handelClick(e){
      const url = e.currentTarget.dataset.url;
      utils.navigateTo(url)
    },
    /**
     * 统一跳转拦截
     */
    handelClickUrl(e) {
      const url = e.currentTarget.dataset.url;
      if(!wx.getStorageSync('token')){
        this.setData({
          showModal:true,
          textInfo:'登录/注册'
        })
        return;
      }
      if(getApp().globalData.userStatus != 2){
        this.setData({
          showModal:true,
          textInfo:'完善个人信息'
        })
        return;
      }
      utils.navigateTo(url)
    },
    // 待办接口回掉 
    watchBack (name){
      this.setData({
        dbNum:getApp().globalData.todolistNum,
        token:wx.getStorageSync('token')
      }) 
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      getApp().watch(this.watchBack)
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