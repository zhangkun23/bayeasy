// pages/invoice/invoiceUpload/updateImgSun/index.js
const tempPath = getApp().globalData.imgPath;
const util = require('../../../../utils/util')
const {
    baseUrl
  } = require('../../../../http/env.js').dev; 
const {submitOcrDeductInvoice} = require('../../../../http/api/api_szpj')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        add_invoice:tempPath + "invoice/incomeInvoice/add_invoice.png",
        updateHandel_err: tempPath + "invoice/incomeInvoice/updateHandel_err.png",
        update_status_0: tempPath + "invoice/incomeInvoice/update_status_0.png",
        update_status_1: tempPath + "invoice/incomeInvoice/update_status_1.png",
        update_status_2: tempPath + "invoice/incomeInvoice/update_status_2.png",

        updateHandel_err:tempPath + "invoice/incomeInvoice/updateHandel_err.png",
        updateHandel_rigth:tempPath + "invoice/incomeInvoice/updateHandel_rigth.png",
        info_max: tempPath + "public/info_max.png",
        
        update_status_bg:tempPath + "invoice/incomeInvoice/update_status_bg.png",
        close_info:tempPath + "invoice/incomeInvoice/close_info.png",
        close_null:tempPath + "invoice/incomeInvoice/close_null.png",
        loadding:tempPath + "public/loadding.png",
        updateImgOrPdfArr:[
            // {
            //     link:'',
            // },
            // {
            //     link:'',
            //     linkInfo:{
            //         seller_name:'北京贝易资有限责任公司',
            //         invoice_type:'增值税专用发票',
            //         invoice_dm:'098093808543'
            //     }
            // }
        ],
        updateImgOrPdfArrNum:0,
        errInfoNum:0, //错误数量
        active:false, //提交按钮状态
        loaddingActive:false, //每张发票loadding
        status:0, //上传发票 查验发票 提交完成
        errInfoShow:false
    },
    errInfoCloseOrShow(){
        this.setData({
            errInfoShow:!this.data.errInfoShow
        })
    },
    // 选择拍照上传照片
    updateImgOrPdf(){
        let that = this;
        wx.showActionSheet({
            itemList: ["从相册中选择", "拍照","pdf文件"],
            success: function (e) {
                //album:相册 返回0  //camera拍照   返回1  
                console.log(e)
                switch(e.tapIndex){
                    case 0:
                        that.chooseWxImageShop("album")
                        break;
                    case 1:
                        that.chooseWxImageShop("camera")
                        break;
                    case 2:
                        that.chooseWxImageShop("pdf")
                        break;
                    default:
                        break;
                }
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        });
    },
    // 选择图片
    chooseWxImageShop(type){
        let lastNum = 9-this.data.updateImgOrPdfArrNum
        if(type == 'pdf'){
            this.updatePdf(lastNum,type);
        }else{
            this.updateImage(lastNum,type);
        }
    },
    // 交验上传文件大小
    setImgSize(ImgArr){
        if (ImgArr[0].size > 2097152) {
            wx.showModal({
                title: "提示",
                content: "选择的图片过大，请上传不超过2M的图片",
                showCancel: !1,
                success: function (e) {
                    e.confirm;
                }
            })
            return true
        }
        return false;
    },
    // 展示pdf
    updatePdf(lastNum){
        console.log('剩余上传数量'+lastNum)
        const that = this;
        wx.chooseMessageFile({
            count: lastNum,
            type:'file',
            success(res){
                console.log('选择pdf',res)
                if (res.tempFiles ) {
                    that.setLink(res.tempFiles,'pdf');
                }
            }
        })
    },
    // 展示Image
    updateImage(lastNum,type){
        console.log('剩余上传数量'+lastNum)
        const that = this;
        wx.chooseMedia({
            count: lastNum,
            mediaType: ['image'],
            sourceType: [type],
            success: function (res) {
                console.log('选择img',res)
                let ImgArr = res.tempFiles;
                if (that.setImgSize(ImgArr)) return;
                
                if (res.tempFiles ) {
                    that.setLink(res.tempFiles,'img');
                }
            }
        })
    },
    setLink(info,type){
        let tempArr = this.data.updateImgOrPdfArr
        if(type == 'img'){
            info.forEach(item => {
                tempArr.push({
                    'link':item.tempFilePath,
                    'loaddingActive':false,
                    'type':type,
                })
            })
        }else{
            info.forEach(item => {
                tempArr.push({
                    'link':item.path,
                    'linkPdf':tempPath + "invoice/incomeInvoice/add_invoice.png",
                    'loaddingActive':false,
                    'type':type,
                })
            })
        }
        this.setData({
            'updateImgOrPdfArr':tempArr,
            'updateImgOrPdfArrNum':this.data.updateImgOrPdfArrNum+info.length,
        })
        console.log(this.data.updateImgOrPdfArr)
        // console.log('上传数量'+this.data.updateImgOrPdfArrNum)
        this.setButtonActice();
    },
    // 更新提交按钮状态
    setButtonActice(){
        if(this.data.updateImgOrPdfArrNum!=0){
            this.setData({
                active:true
            })
        }else{
            this.setData({
                active:false
            })
        }
    },
    // 删除已经上传的文件
    removeItem(e){
        const index = e.currentTarget.dataset.index;
        let tempArr = this.data.updateImgOrPdfArr;
        tempArr.splice(index,1)
        this.setData({
            'updateImgOrPdfArr':tempArr,
            'updateImgOrPdfArrNum':tempArr.length,
            'errInfoNum':this.data.errInfoNum-1<0?0:this.data.errInfoNum-1
        })
        if(this.data.updateImgOrPdfArrNum == 0){
            this.setData({
                active:false,
                status:0
            })
        }
        console.log(this.data.updateImgOrPdfArrNum)
    },

    // 上传dpf/img
    addPdfOrImg(imageOrPdfPath){
        // this.submitOcrDeductInvoice();
        // return;
        const temp = this.data.updateImgOrPdfArr;
        this.setData({
            'updateImgOrPdfArr':temp.map(item => {
                item.loaddingActive = true
                return item;
            }),
            status:1
        })
        let that = this;
        this.data.updateImgOrPdfArr.forEach((item,index)=> {
            const {link} = item;
            wx.uploadFile({
                url: baseUrl + `/deduct_invoice/ocr_deduct_invoice?index=${index}&token=${wx.getStorageSync('token')}`,
                filePath:  link,
                name: 'link',
                formData: {},
                success: function (info) {
                    const res = JSON.parse(info.data);
                    console.log(res)
                    console.log('index=='+index)
                    let temp = that.data.updateImgOrPdfArr;
                    temp[index].loaddingActive = false
                    if(res.ret){
                        temp[index].linkInfo = res.data;
                        temp[index].requestStatus = res.ret
                    }else{
                        temp[index].linkInfo = {};
                        temp[index].requestStatus = res.ret
                        that.setData({
                            errInfoNum:that.data.errInfoNum+1
                        })
                    }
                    that.setData({
                        'updateImgOrPdfArr':temp
                    })
                    console.log(that.data.updateImgOrPdfArr)
                },
                fail: function (res) {
                    wx.hideLoading();
                  console.log(res, '失败')
                }
            })
        })
    },
    submitOcrDeductInvoice(){
        let tempArr = [1,2,3,4,5]
        submitOcrDeductInvoice({ids:tempArr}).then( res => {
            console.log(res)
        })
    },
    jumpAddress(){
        util.navigateTo('/pages/invoice/invoiceUpload/address/index')
    },
    handelClick(){
        util.navigateTo('/pages/invoice/acquisitionCost/index')
    },
    ocrDeductInvoice(){
        
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