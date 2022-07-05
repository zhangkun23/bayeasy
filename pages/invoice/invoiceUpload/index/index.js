// pages/invoice/invoiceUpload/index.js
const tempPath = getApp().globalData.imgPath+'invoice/invoiceUpdate/';
const utils = require('../../../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imageUpdate:tempPath+'imageUpdate.png',
        handelUpdate:tempPath+'handelUpdate.png'
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
    },
    handelClickUrl(e){
        const url = e.currentTarget.dataset.url;
        if(!url) return; 
        utils.navigateTo(url)
    },

    onLoad: function (options) {
        // console.log('222')
        // console.log(options)
    },

})