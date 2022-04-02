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
        show:false,
        serve:tempPath + 'public/serve.png',
    },

    handelClick(){
        this.setData({
            show: true,
        })
    },
    getPhoneNumber (e) {
        console.log(e.detail)
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