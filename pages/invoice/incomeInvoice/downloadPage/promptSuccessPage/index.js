// pages/invoice/incomeInvoice/downloadPage/promptSuccessPage/index.js
const tempPath = getApp().globalData.imgPath;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        successIconImg: tempPath + "public/done.png",
        sentSuccessfully: tempPath + 'tax/businessAnnual/sentSuccessfully.png',
        type: '',
        isAndroid: '1',
        currentID: 0
    },
    backIndex() {
        // const res = wx.getSystemInfoSync() // 读取设备所有信息
        // console.log("判断手机类型--------------"+res)
        // console.log(this.data.type, 'type')
        // if (this.data.type) {
        //     console.log("判断手机类型--------------"+res.platform )
        //      if(res.platform == "ios") { 
        //         wx.redirectTo({
        //             url: '/pages/invoice/incomeInvoice/details/eInvoice/index?currentID=' + this.data.currentID,
        //         })
        //     }
        // }

    },
    isIosOrAndroid() {
        const res = wx.getSystemInfoSync() // 读取设备所有信息
        // console.log(res); // 打印获取的信息
        // console.log(res.platform); // 获取安卓或者iOS数据
        if (res.platform == "android") { // 判断
            this.setData({
                isAndroid: 2
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let currerntPage = getCurrentPages();
        this.setData({
            type: options.type,
            currentID: options.currentID,
            downloadNum: options.downloadNum,
            email: options.email
        })
        // this.isIosOrAndroid();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})