// pages/login/login/index.js
const tempPath = getApp().globalData.imgPath;
const utils = require('../../../utils/util.js')
const {getWxPhone,wxlogin,todolist,getUserStatus,myOperate} = require('../../../http/api/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        logo_byz: tempPath + 'public/logo_byz.png',
        loginSelect: tempPath + 'login/loginSelect.png',
        loginUnSelect: tempPath + 'login/loginUnSelect.png',
        logo: tempPath + 'public/logo.png',
        serve:tempPath + 'public/serve.png',
        agreementStatus:false
        
    },
    // 勾选协议
    handelClick(){
        wx.showToast({
            title: '请勾查看并勾选协议',
            icon:'none'
        })
    },
    backIndex(){
        wx.navigateTo({
            url: '/page/index/index',
        })
    },
    // 微信手机号授权弹框 只能在手机调试
    getPhoneNumber (e) {
        // console.log(e.detail.code)
        getWxPhone(e.detail.code).then(res => {
            if(res.ret){
                const phone = res.data.purePhoneNumber;
                wx.login({
                    success: res => {
                        if(res.errMsg == "login:ok"){ 
                            let param = {
                                mobile:phone,
                                code:res.code
                            }
                            this.wxlogin(param);
                        }
                    }
                })
            }
        })
    },
    // 平台登录
    wxlogin(param){
        wxlogin(param).then( res => {
            if(res.ret){
                wx.setStorageSync('token', res.data.access_token)
                wx.setStorageSync('mobile', res.data.mobile)
                wx.setStorageSync('idCard', res.data.identity_card)
                this.getInfo();
            }
        })
    },
    getInfo(){
        // 查询待办
        todolist().then(res => {
            if(res.ret){
                getApp().globalData.todolistNum = 1//res.data.nums;
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
                switch (getApp().globalData.userStatus ){
                    case 0:
                        wx.navigateTo({
                            url: '../authentication/index',
                        })
                        break;
                    case 1:
                        wx.navigateTo({
                            url: '../securityCheck/index',
                        })
                        break;
                    case 2:
                        wx.switchTab({url:'../../index/index'})
                        break;
                    default :
                    wx.switchTab({url:'../../index/index'})
                }
            }
        })
        // 是否有运营人员
        myOperate().then(res => {
            if(res.ret){
                getApp().globalData.operate = true;
            }
        })
    },

    // 昵称性别
    getUserProfile(){
        wx.getUserProfile({
            desc: "获取你的昵称、头像、地区及性别",
            success: res => {
              let wxUserInfo = res.userInfo;
              if(res.errMsg == 'getUserProfile:ok'){
                getApp().globalData.logoImg = wxUserInfo.avatarUrl
              }
            },
            fail: res => {
                 //拒绝授权
              return;
            }
          })
    },
    // 是否勾选协议
    collectFun(value){
        this.setData({
            agreementStatus:value.detail
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getUserProfile();
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