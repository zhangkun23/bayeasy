// pages/login/loginPrimary/index.js
const tempPath = getApp().globalData.imgPath;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone:'',
        code:'',
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