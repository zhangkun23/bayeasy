// pages/invoice/invoiceUpload/updateImgSun/index.js
const tempPath = getApp().globalData.imgPath;
const util = require('../../../../utils/util')
const {
    baseUrl
  } = require('../../../../http/env.js').dev; 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        add_invoice:tempPath + "invoice/incomeInvoice/add_invoice.png",
        updateHandel_err: tempPath + "invoice/incomeInvoice/updateHandel_err.png",
        update_status_0: tempPath + "invoice/incomeInvoice/update_status_0.png",

        updateHandel_err:tempPath + "invoice/incomeInvoice/updateHandel_err.png",
        updateHandel_rigth:tempPath + "invoice/incomeInvoice/updateHandel_rigth.png",

        whith_close:tempPath + "invoice/incomeInvoice/whith_close.png",
        whith_right:tempPath + "invoice/incomeInvoice/whith_right.png",
        update_status_bg:tempPath + "invoice/incomeInvoice/update_status_bg.png",
        close_info:tempPath + "invoice/incomeInvoice/close_info.png",
        close_null:tempPath + "invoice/incomeInvoice/close_null.png",

        errinfo:false,
        updateImgOrPdfArr:[
            // {
            //     link:'',
            //     linkInfo:null
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
    // 选择pdf
    updatePdf(lastNum){
        wx.chooseMessageFile({
            count: lastNum,
            type:'file',
            success(res){
                console.log('选择',res)
                let padpath = res.tempFiles[0].path;
                console.log(padpath)
                //打开pdf文件

                that.setData({
                    'updateImgOrPdfArr':[
                        {
                            link:res.tempFiles[0].path
                        }
                    ]
                })

                console.log(that.data.updateImgOrPdfArr)
            }
        })
    },
    // 上传Image
    updateImage(lastNum,type){
        const that = this;
        wx.chooseMedia({
            count: lastNum,
            mediaType: ['image'],
            sourceType: [type],
            success: function (res) {
                console.log(res)
                let ImgArr = res.tempFiles;
                if (that.setImgSize(ImgArr)) return;
                
                if (res.tempFiles ) {
                    // wx.showLoading({
                    //     title: '正在加载',
                    // });
                    let tempArr = that.data.updateImgOrPdfArr

                    res.tempFiles.forEach(item => {
                        tempArr.push({link:item.tempFilePath})
                    })
                    that.setData({
                        'updateImgOrPdfArr':tempArr
                    })
                    that.setData({
                        updateImgOrPdfArrNum:that.data.updateImgOrPdfArrNum+res.tempFiles.length
                    })
                    console.log(that.data.updateImgOrPdfArr)
                }
            }
        })
    },

    // 上传dpf/img
    updatePdfOrImg(imageOrPdfPath){
        wx.uploadFile({
            url: baseUrl + '/deduct_invoice/ocr_deduct_invoice?token='+ wx.getStorageSync('token'),
            filePath:  imageOrPdfPath,
            name: 'link',
            formData: {},
            success: function (info) {
                wx.hideLoading();
                console.log(info)
            },
            fail: function (res) {
                wx.hideLoading();
              console.log(res, '失败')
            }
        })
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