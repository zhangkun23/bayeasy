// pages/invoice/invoiceUpload/updateImgDetail/index.js
const tempPath = getApp().globalData.imgPath;
const util = require('../../../../utils/util')
const {delDeductInvoiceFile} = require('../../../../http/api/api_szpj')
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
        updateImgOrPdfArr:[],
        status:0,
        imgArr:[], //放大图片数组
        isShowModal:false,
        buttons: [{
            text: '取消'
        },{
            text: '确定'
        }],
        removeItemE:{}, //要删除的e
    },
    // 展示my-dialog
    showDialog(e){
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

    // 删除当前选项
    removeItem(e){
        if(this.data.status ==1 && e.currentTarget.dataset.id){
            this.delDeductInvoiceFile(e.currentTarget.dataset.id)
        }
        const index = e.currentTarget.dataset.index;
        let tempArr = this.data.updateImgOrPdfArr;
        tempArr.splice(index,1)
        this.setData({
            updateImgOrPdfArr:tempArr
        })
        if(tempArr.length == 0){
            wx.removeStorageSync("updateImgOrPdfArr")
            wx.removeStorageSync("index")
            wx.navigateBack()
        }else{
            wx.setStorageSync('updateImgOrPdfArr',this.data.updateImgOrPdfArr)
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
        }else{
            const info = this.data.updateImgOrPdfArr;
            this.setData({
                imgArr:info.map( item => {
                    if(item.type == 'img'){
                        return item.link
                    }
                }),
            })
            let that = this;
            wx.previewImage({
                current: data.pdfpath,
                urls: that.data.imgArr,
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
            currentIndex:wx.getStorageSync('index'),
            status:wx.getStorageSync('status'),
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