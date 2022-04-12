// pages/invoice/invoiceUpload/updateHandel/index.js
const tempPath = getApp().globalData.imgPath;
const {updateHandlInvoice} = require('../../../../http/api/api_szpj.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        close: tempPath + "invoice/invoiceUpdate/close.png",
        form:{
            invoice_type:'',
            invoice_dm:'',
            invoice_hm:'',
            total_amount:'',
            invoice_check_code:'',
            invoice_date:'',
            link:'',
        }
    },
    getInvoice(){
        console.log(11)
    },
    // 手动上传提交
    subbmint(){
        updateHandlInvoice().then(res => {
            if(res.ret){
                console.log(res)
            }
        })
    },
       // 子组建数据同步
    setInputValue(e) {
        let temp = `form.${e.detail.key}`
        this.setData({
          [temp]: e.detail.value //使用子组件的值
        })
        console.log(this.data.form)
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