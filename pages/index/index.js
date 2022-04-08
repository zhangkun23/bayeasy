const tempPath = getApp().globalData.imgPath;
const utils = require('../../utils/util.js')
const {todolist,getUserStatus,myOperate} = require('../../http/api/api.js');
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
      userStatus:2
    },
    goLogin(){
      let userStatus = getApp().globalData.userStatus;  //用户状态 0 不为贝易资用户, 1 为贝易资用户未关联信息,2 已关联
      if(this.data.textInfo == '登录/注册'){
        utils.navigateTo('/pages/login/login/index')
        this.setData({
          showModal:false,
        })
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
      if(url == "info"){
        let userStatus = getApp().globalData.userStatus;
        userStatus = 0
        if(userStatus == 0 ){
          utils.navigateTo('/pages/login/authentication/index')
        }else if(userStatus == 1){
          utils.navigateTo('/pages/login/securityCheck/index')
        }
        return;
      }
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
      utils.getTabBarIndex(this,2);
      if(wx.getStorageSync('token')!=undefined && wx.getStorageSync('token')!=""  ){
        todolist().then(res => {
          if(res.ret){
            getApp().globalData.todolistNum = res.data.nums;
            this.setData({
              dbNum:res.data.nums
            }) 
            // this.setData({
            //   dbNum:res.data.nums,
            //   token:wx.getStorageSync('token')
            // }) 
          }
        })
        /**
         * 查询用户关联状态 /决定路由跳转地址
         *  0 不为贝易资用户
         *  1 为贝易资用户未关联信息
         *  2 已关联
         */
        getUserStatus().then(res => {
          if(res.ret){
            getApp().globalData.userStatus =  res.data.status;
            this.setData({
              userStatus:res.data.status
            })
          }
        })
        // 是否有运营人员
        myOperate().then(res => {
            if(res.ret){
                getApp().globalData.operate = true;
            }
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