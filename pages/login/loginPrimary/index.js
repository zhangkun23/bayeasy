// pages/login/loginPrimary/index.js
const tempPath = getApp().globalData.imgPath;
const {
    login,
    todolist,
    getUserStatus,
    myOperate
  } =  require('../../../http/api/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone:'18513136572',
        code:'111111',
        inputClose:tempPath+'public/inputClose.png',
        codeMessage:'发送验证码',
        codeMessageStats:true,
        codeCountdown:'60s',
        phoneBorder:'',
        codeBorder:'',
        phoneCloseStatus:true,
        phoneFocus:false
    },
    handelClickLogin(){
        console.log(this.data.phone)
        let param = {
            mobile:this.data.phone,
            captcha:this.data.code
          }
          login(param).then( res=> {
            if(res.ret){
              wx.setStorageSync('token', res.data.access_token)
              getApp().globalData.mobile =  res.data.mobile;
              this.getInfo();
             
            }
          })
    },
    getInfo(){
        // 查询待办
        todolist().then(res => {
            if(res.ret){
                getApp().globalData.todolistNum = 1//res.data.nums;
                wx.switchTab({url:'../../index/index'})
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
            }
        })
        // 是否有运营人员
        myOperate().then(res => {
            if(res.ret){
            getApp().globalData.operate = true;
            }
        })
    },
    bindinputCode(e){
        this.setData({
            code:e.detail.value
        })
    },
    setInput(){},
    clearPhone(){
        console.log('清空数据')
        // setTimeout(() => {
            this.setData({
                phone:"",
                phoneFocus:true
            })
        // },100)
    },
    phoneInput(){
        if(this.data.phone !=''){
            this.setData({
                phoneCloseStatus:false,
            })
        }
    },
    // 获取焦点
    bindfocus(e){
        if(e.currentTarget.dataset.type == 'phone'){
            this.setData({
                phoneBorder:'2px solid #1D83F0',
            })
            if(this.data.phone !=''){
                this.setData({
                    phoneCloseStatus:false,
                })
            }
        }else{
            this.setData({
                codeBorder:'2px solid #1D83F0',
            })
        }
    },
    // 失去焦点
    bindblur(e){
        console.log('失去焦点')
        if(e.currentTarget.dataset.type == 'phone'){
            this.setData({
                phoneBorder:'',
                phoneCloseStatus:true
            })
        }else{
            this.setData({
                codeBorder:'',
            })
        }
    },
    // 发送验证码
    handelClickCode(){
        let myreg = /^[1][0-9][0-9]{9}$/;
        if (!myreg.test(this.data.phone)){
            console.log('111')
            return;
        }  
        this.setData({
            codeMessageStats:false
        })
        let num = 10;
        const setMessage = setInterval(() => {
            this.setData({
                codeCountdown: num-- + "s"
            })
            if (num == -1) {
                this.codeMessage = "发送验证码";
                this.setData({
                    codeMessageStats: true
                })
                clearInterval(setMessage);
            }
        }, 1000);
    },
    collectFun(val){
        console.log(val)
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