// pages/invoice/invoiceUpload/updateImgDetail/index.js
const tempPath = getApp().globalData.imgPath;
const util = require('../../../../utils/util')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        whith_close:tempPath + "invoice/incomeInvoice/whith_close.png",
        whith_right:tempPath + "invoice/incomeInvoice/whith_right.png",
        red:tempPath + "invoice/incomeInvoice/red.png",
        green:tempPath + "invoice/incomeInvoice/green.png",
        close_info:tempPath + "invoice/incomeInvoice/close_info.png",
        close_null:tempPath + "invoice/incomeInvoice/close_null.png",
        autoplay:false,
        currentIndex:0,
        updateImgOrPdfArr:[
            // {
            //     link:'',
            //     linkInfo:{
            //         seller_name:'asdasd',
            //         invoice_type:'增值税专asdasd用发票',
            //         invoice_dm:'123123',
            //         invoice_hm:'123123',
            //         total_amount:'123'
            //     },
            //     requestStatus:true
            // },
            // {
            //     link:'',
            //     linkInfo:{},
            //     requestStatus:false,
            //     message:'请您在每月23日前将纸质票据邮寄至本公司，邮寄信息请咨询运营专员，如未及时邮寄将无法在本月计入成本！'
            // },
            // {
            //     link:'',
            //     linkInfo:{
            //         seller_name:'asdasd',
            //         invoice_type:'增值税专asdasd用发票',
            //         invoice_dm:'123123',
            //         invoice_hm:'123123',
            //         total_amount:'123'
            //     },
            //     requestStatus:true
            // },
        ]
    },

    // 删除当前选项
    removeItem(e){
        const index = e.currentTarget.dataset.index;
        let tempArr = this.data.updateImgOrPdfArr;
        tempArr.splice(index,1)
        this.setData({
            updateImgOrPdfArr:tempArr
        })
        if(tempArr.length == 0){
            wx.removeStorageSync("updateImgOrPdfArr")
            wx.removeStorageSync("index")
            util.navigateTo('/pages/invoice/invoiceUpload/updateImgInfo/index')
        }
    },

    // 预览pdf
    handelClickDetail(e){
        const data = e.currentTarget.dataset;
        if(data.type == 'pdf'){
            wx.openDocument({
                filePath: data.pdfpath, //要打开的文件路径
                success: function (res) {
                  console.log('打开PDF成功');
                }
            })
        }
    },

    backIndex(){
        wx.setStorageSync('updateImgOrPdfArr', this.data.updateImgOrPdfArr)
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
        this.setData({
            updateImgOrPdfArr: wx.getStorageSync('updateImgOrPdfArr'),
            currentIndex:wx.getStorageSync('index')
        })

        let arr = this.data.updateImgOrPdfArr;
        console.log(arr)
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