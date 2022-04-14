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
      userStatus:2,
      contents:["为便于贝易资为您提供更为完善的服务", "需要您先完成身份信息安全校验"]
    },
    goLogin(){
      let userStatus = this.data.userStatus;  //用户状态 0 不为贝易资用户, 1 为贝易资用户未关联信息,2 已关联
      if(this.data.textInfo == '登录/注册'){
        utils.navigateTo('/pages/login/login/index')
        this.setData({
          showModal:false,
          
        })
      }else{
        this.jumpUrl(userStatus);
      }
    },
    // 登录与完善个人信息按钮直接跳
    handelClick(e){
      const url = e.currentTarget.dataset.url;
      if(url == "info"){
        let userStatus = this.data.userStatus;
        this.jumpUrl(userStatus);
        return;
      }
      utils.navigateTo(url)
    },
    jumpUrl(userStatus){
      if(userStatus == 0){
        utils.navigateTo('/pages/login/authentication/index')
      }else if(userStatus == 1){
        utils.navigateTo('/pages/login/securityCheck/index')
      }else if(userStatus==2){
        utils.navigateTo('/pages/login/information/index')
      }
    },
    /**
     * 统一跳转拦截
     */
    handelClickUrl(e) {
      const url = e.currentTarget.dataset.url;
      if(!wx.getStorageSync('token')){
        this.setData({
          showModal:true,
          textInfo:'登录/注册',
          contents:["为便于贝易资为您提供更为完善的服务","需您先登录贝易资并完成身份信息安全校验" ]
        })
        return;
      }
      if(getApp().globalData.userStatus != 2){
        this.setData({
          showModal:true,
          textInfo:'完善个人信息',
          contents:["为便于贝易资为您提供更为完善的服务","需要您先完成身份信息安全校验"]
        })
        return;
      }
      
      utils.navigateTo(url)
    },
    // 待办接口回掉 
    watchBack (){
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
      if(wx.getStorageSync('token')){
        todolist().then(res => {
          if(res.ret){
            getApp().globalData.todolistNum = res.data.nums;
            this.setData({
              dbNum:res.data.nums,
              token:wx.getStorageSync('token')
            }) 
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
            getApp().globalData.userStatus = 1
            this.setData({
              userStatus: 1
            })
          }
        })
        // 是否有运营人员
        myOperate().then(res => {
            if(res.ret){
                getApp().globalData.operate = true;
            }
        })
      }else{
        this.setData({
          token:''
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