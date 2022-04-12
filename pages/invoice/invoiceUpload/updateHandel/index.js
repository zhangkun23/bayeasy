// pages/invoice/invoiceUpload/updateHandel/index.js
const tempPath = getApp().globalData.imgPath;
const {updateHandlInvoice} = require('../../../../http/api/api_szpj.js')
const {getInvoiceType} = require('../../../../http/api/api_szpj')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        close: tempPath + "invoice/invoiceUpdate/close.png",
        invoiceImage:"",
        addImg: tempPath + "invoice/invoiceUpdate/add.png",
        addImgStatus:true,
        form:{
            invoice_type:'',
            invoice_dm:'',
            invoice_hm:'',
            total_amount:'',
            invoice_check_code:'',
            invoice_date:'',
            link:'',
        },
        activityArr:[],
    },
 
    // 手动上传提交
    subbmint(){

        let param = this.data.form;
        updateHandlInvoice(param).then(res => {
            if(res.ret){
              
            }
        })
        let imgPath = this.data.invoiceImage
    },
    clearImg(){
        this.setData({
            ['form.link']:""
        })
    },
    // 子组建数据同步
    setInputValue(e) {
        let temp = `form.${e.detail.key}`
        this.setData({
          [temp]: e.detail.value //使用子组件的值
        })
        if(e.detail.key == 'total_amount'){
            this.priceEvent(e)
        }
        let form = this.data.form;
        if (form.invoice_type && form.invoice_dm && form.invoice_hm && form.total_amount && form.invoice_check_code && form.invoice_date ) {
            console.log('1111')
        }
    },
    // 价格限制小数点后两位
    priceEvent(e) {
        var money;
        if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
            money = e.detail.value;
        } else {
            money = e.detail.value.substring(0, e.detail.value.length - 1);
        }
        this.setData({
            ['form.total_amount']: money,
        })
    },

    // 设置发票类型
    bindPickerChange(e){
        let category = this.data.activityArr[e.detail.value];
        this.setData({
            ['form.invoice_type']: category.type
        });
    },
    // 拍照/相册
    updateImage(){
        let that = this;
        wx.showActionSheet({
            itemList: ["从相册中选择", "拍照"],
            success: function (e) {
                //album:相册 返回0  //camera拍照   返回1  
                console.log(e)
                e.cancel || (0 == e.tapIndex ? that.chooseWxImageShop("album") : 1 == e.tapIndex && that.chooseWxImageShop("camera"));
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        });
    },
    chooseWxImageShop(type){
        var that = this;
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: [type],
            success: function (res) {
                console.log(res)
                let ImgArr = res.tempFiles;
                let tempStatus = true;
                ImgArr.forEach(item => {
                    if (item.size > 2097152) {
                        wx.showModal({
                            title: "提示",
                            content: "选择的图片过大，请上传不超过2M的图片",
                            showCancel: !1,
                            success: function (e) {
                            e.confirm;
                            }
                        })
                        tempStatus = false
                    }
                })
                if (res.tempFiles[0] && tempStatus) {
                    const imgPath = res?.tempFiles[0].tempFilePath;
                    console.log(imgPath)
                    that.setData({
                        ['form.link']:imgPath
                    })
                }
            }
        })
    },
    // 选择开票日期
    bindDateChange(event) {
        this.setData({
          ['form.invoice_date']: event.detail.value
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
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        getInvoiceType().then(res=> {
            if(res.ret){
                  this.setData({
                    activityArr:res.data
                })
            }
        })
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