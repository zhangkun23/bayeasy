// pages/invoice/invoiceUpload/updateImgSun/index.js
const tempPath = getApp().globalData.imgPath;
const util = require('../../../../utils/util')
const {
    baseUrl
  } = require('../../../../http/env.js').dev; 
const {submitOcrDeductInvoice,delDeductInvoiceFile} = require('../../../../http/api/api_szpj')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        add_invoice:tempPath + "invoice/incomeInvoice/add_invoice.png",
        pdfImg:tempPath + "invoice/incomeInvoice/pdfImg.png",
        updateHandel_err: tempPath + "invoice/incomeInvoice/updateHandel_err.png",
        update_status_0: tempPath + "invoice/incomeInvoice/update_status_0.png",
        update_status_1: tempPath + "invoice/incomeInvoice/update_status_1.png",
        update_status_2: tempPath + "invoice/incomeInvoice/update_status_2.png",

        updateHandel_err:tempPath + "invoice/incomeInvoice/updateHandel_err.png",
        updateHandel_rigth:tempPath + "public/done.png",
        info_max: tempPath + "public/info_max.png",
        
        update_status_bg:tempPath + "invoice/incomeInvoice/update_status_bg.png",
        close_info:tempPath + "invoice/incomeInvoice/close_info.png",
        close_null:tempPath + "invoice/incomeInvoice/close_null.png",
        loadding:tempPath + "public/loadding.png",
        updateImgOrPdfArr:[],
        updateImgOrPdfArrNum:0,
        errInfoNum:0, //错误数量
        active:false, //提交按钮状态
        loaddingActive:false, //每张发票loadding
        status:0, //0上传发票 1查验发票 2提交完成
        errInfoShow:false,
        errInfo:[],
        returnErrInfoShow:false,
        invoiceRightNum:0, //正确张数
        invoiceErrNum:0, //失败张数
        loadStatusNum:0, //查验发票提交完成张数
        isShowModal:false,
        buttons: [{
            text: '取消'
        },{
            text: '确定'
        }],
        removeItemE:{}, //要删除的e
        montmShow:false,
    },
    errInfoCloseOrShow(){
        this.setData({
            errInfoShow:!this.data.errInfoShow
        })
    },
    // 查验发票跳转详情
    handelClickDetail(e){
        if(this.data.loadStatusNum!=0) return;
        const data = e.currentTarget.dataset;
        wx.setStorageSync('updateImgOrPdfArr',this.data.updateImgOrPdfArr)
        wx.setStorageSync('index', data.index)
        wx.setStorageSync('status', this.data.status)
        if(data.type == 'pdf'){
            wx.openDocument({
                filePath: data.pdfpath, //要打开的文件路径
                success: function (res) {
                  console.log('打开PDF成功');
                }
            })
        }else{
            util.navigateTo('/pages/invoice/invoiceUpload/updateImgDetail/index')
        }
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
        const that = this;
        wx.chooseMessageFile({
            count: lastNum,
            type:'file',
            success(res){
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
                    'linkPdf':this.data.pdfImg,
                    'loaddingActive':false,
                    'type':type,
                })
            })
        }
        this.setData({
            'updateImgOrPdfArr':tempArr,
            'updateImgOrPdfArrNum':this.data.updateImgOrPdfArrNum+info.length,
        })
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
        if(this.data.status ==1 && e.currentTarget.dataset.id){
            this.delDeductInvoiceFile(e.currentTarget.dataset.id)
        }
        const index = e.currentTarget.dataset.index;
        let tempArr = this.data.updateImgOrPdfArr;
        tempArr.splice(index,1)
        this.setData({
            'updateImgOrPdfArr':tempArr,
            'updateImgOrPdfArrNum':tempArr.length,
            'errInfoNum':this.data.errInfoNum-1<0?0:this.data.errInfoNum-1
        })
        // 删除了全部文件 状态变更问上传发票阶段
        if(this.data.updateImgOrPdfArrNum == 0){
            this.setData({
                active:false,
                status:0
            })
        }
        // 查验阶段删除错误发票 更改提交按钮状态
        if(this.data.updateImgOrPdfArrNum != 0 && this.data.errInfoNum==0 ){
            this.setData({
                active:true
            })
        }
    },
    // 删除已经识别的发票
    delDeductInvoiceFile(id){
        delDeductInvoiceFile(id).then(res => {
            if(!res.ret){
                wx.showToast({
                    title: res.message,
                    icon: 'none',
                })
            }
        })
    },

    // 上传发票-----》查验发票
    ocrDeductInvoice(){
        const temp = this.data.updateImgOrPdfArr;
        this.setData({
            'updateImgOrPdfArr':temp.map(item => {
                item.loaddingActive = true
                return item;
            }),
            status:1,
            active:false
        })
        let that = this;
        // 提交数量 记录全部提交完成才能查看详情页面
        this.setData({
            loadStatusNum:temp.length
        })
        let tempDeductNum = 0;
        this.data.updateImgOrPdfArr.forEach((item,index)=> {
            const {link} = item;
            wx.uploadFile({
                url: baseUrl + `/deduct_invoice/ocr_deduct_invoice?index=${index}&token=${wx.getStorageSync('token')}`,
                filePath:  link,
                name: 'link',
                formData: {},
                success: function (info) {
                    const res = JSON.parse(info.data);
                    let temp = that.data.updateImgOrPdfArr;
                    temp[index].loaddingActive = false
                    if(res.ret){
                        temp[index].linkInfo = res.data;
                        temp[index].requestStatus = res.ret
                    }else{
                        temp[index].linkInfo = {};
                        temp[index].requestStatus = res.ret
                        temp[index].message = res.message
                        that.setData({
                            errInfoNum:that.data.errInfoNum+1
                        })
                    }
                    that.setData({
                        'updateImgOrPdfArr':temp,
                        'loadStatusNum':that.data.loadStatusNum-1
                    })

                    tempDeductNum = tempDeductNum+1;

                    console.log('temp'+temp.length+'-----'+index)
                    if(tempDeductNum == temp.length && that.data.errInfoNum == 0 ){
                        that.setData({
                            active:true
                        })
                    }
                },
                fail: function (res) {
                    wx.hideLoading();
                  console.log(res, '失败')
                }
            })
        })
    },
    // 查验发票-----》提交完成
    submitOcrDeductInvoice(){
        const data = this.data.updateImgOrPdfArr;
        let tempArr = [];
        data.map(item => {
            tempArr.push(item.linkInfo.id) 
        })
        this.setData({
            montmShow:true
        })
        submitOcrDeductInvoice({ids:tempArr}).then( res => {
            if(res.ret){
                const info = res.data;
                const errNum = info.error_data.length;
                if(info.error_data.length>0){
                    this.setData({
                        errInfo:info.error_list,
                        returnErrInfoShow:true,
                        invoiceRightNum: tempArr.length-errNum,
                        invoiceErrNum:errNum
                    })
                }
                wx.removeStorageSync("updateImgOrPdfArr")
                wx.removeStorageSync("index")
                this.setData({
                    montmShow:false,
                    status:2,
                })
            }else{
                wx.showToast({
                    title: res.message,
                    icon: 'none',
                })
            }
        })
    },
    // 上传pdf/img
    addPdfOrImg(){
        if(this.data.status ==0 ){
            this.ocrDeductInvoice();
        }else if(this.data.status == 1){
            this.submitOcrDeductInvoice();
        }
    },
    jumpAddress(){
        util.navigateTo('/pages/invoice/invoiceUpload/address/index')
    },
    handelClick(){
        util.navigateTo('/pages/invoice/acquisitionCost/index')
    },

    // 展示my-dialog
    showDialog(e){
        if(this.data.loadStatusNum!=0) return;
        this.setData({
            isShowModal:true,
            removeItemE:e
        })
    },
    tapDialogButtonClose(e){
        this.setData({
            isShowModal:false
        })
        if(e.detail.item.text == '确定'){
            this.removeItem(this.data.removeItemE);
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
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if(this.data.status==1){
            const info = wx.getStorageSync('updateImgOrPdfArr');
            if(info){
                let errNum = 0;
                info.map(item => {
                    if(!item.requestStatus){
                        errNum = errNum+1;
                    }
                })
                this.setData({
                    updateImgOrPdfArr: wx.getStorageSync('updateImgOrPdfArr'),
                    errInfoNum:errNum, //错误数量
                    status:1, //上传发票 查验发票 提交完成
                })
                // 提交按钮
                if(errNum==0){
                    this.setData({
                        active:true
                    })
                }
            }else{
                this.setData({
                    updateImgOrPdfArr: [],
                    errInfoNum:0, //错误数量
                    status:0, //上传发票 查验发票 提交完成
                })
            }
        }
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
        console.log('页面卸载')
        // 返回删除所有文件
        wx.removeStorageSync("updateImgOrPdfArr")
        wx.removeStorageSync("index")
        wx.removeStorageSync("status")

        let tempArr = this.data.updateImgOrPdfArr;
        if(this.data.status ==1 ){
            tempArr.map( item => {
                this.delDeductInvoiceFile(item.linkInfo.id)
            })
        }
        this.setData({
            updateImgOrPdfArr:[]
        })

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