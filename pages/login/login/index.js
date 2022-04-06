// pages/login/login/index.js
const tempPath = getApp().globalData.imgPath;
const utils = require('../../../utils/util.js')
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

    handelClick(){
        wx.showToast({
            title: '请勾查看并勾选协议',
            icon:'none'
        })
        if(this.data.agreementStatus){
            utils.navigateTo('../loginPrimary/index')
        }
    },
    getPhoneNumber (e) {
        console.log(e.detail)
        wx.checkSession({
            success (res) {
              console.log(res,'登录状态')
                  console.log(e,'1111')
              //session_key 未过期，并且在本生命周期一直有效
            },
            fail (err) {
            console.log(err)
            }
          })
          
        // wx.authorize({
        //     scope: 'scope.record',
        //     success () {
        //       // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        //     //   wx.startRecord()
        //     }
        //   })
    },

    // 
    getUserProfile(){
        console.log(111)
        wx.getUserProfile({
            desc: "获取你的昵称、头像、地区及性别",
            success: res => {
              console.log(res)
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
 
    handelClickLogin(){
        utils.navigateTo('../loginPrimary/index')
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
        console.log(111)
        this.getUserProfile();
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