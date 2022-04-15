// pages/invoice/acquisitionCost/invoiceDetails/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        invoiceUrl: null,
        invoiceIcon: app.globalData.imgPath + 'invoice/acquisitionCost/invoiceIcon.png',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.emit('acceptDataFromOpenedPage', {
            data: 'test'
        });
        eventChannel.emit('someEvent', {
            data: 'test'
        });
        // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
        eventChannel.on('getInfo', function (data) {
            console.log(data)
        })

    },
    handleInfo: function (info) {
        this.setData({
            status: info.status,
            invoice_type: info.invoice_type,
            invoice_dm: info.invoice_dm,
            invoice_hm: info.invoice_hm,
            total_amount: info.total_amount,
            seller_name: info.seller_name,
        })
    }
})