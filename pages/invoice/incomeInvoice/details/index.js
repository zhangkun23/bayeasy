// pages/invoice/incomeInvoice/details/index.js
const {
    get_invoice_detail,
    apply_invoice
} = require('../../../../http/api/api_szpj')
const app = getApp()
const INVOICE_STATUS_WAIT = [0]
const INVOICE_STATUS_GOING = [1, 2, 8, 9]
const INVOICE_STATUS_DONE = [3]
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showEmpty: false,
        emptyPic: app.globalData.emptyPic,
        hasOperate: app.globalData.operate,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (!options.hasOwnProperty('id')) {
            return
        }
        get_invoice_detail(options.id).then(res => {
            var that = this
            if (res.ret) {
                if (res.data instanceof Object && res.data) {
                    let info_details = res.data
                    // 去掉null 
                    Object.keys(info_details).forEach(function (key, index) {
                        if (this[key] == null) this[key] = "";
                    }, info_details);
                    // 分析状态
                    if (INVOICE_STATUS_WAIT.includes(info_details.status_code)) {
                        info_details.myStatus = 0
                    } else if (INVOICE_STATUS_GOING.includes(info_details.status_code)) {
                        info_details.myStatus = 1
                    } else if (INVOICE_STATUS_DONE.includes(info_details.status_code)) {
                        info_details.myStatus = 2
                    }
                    const new_data = Object.assign(this.data, info_details)
                    this.setData(new_data);
                } else {
                    console.error("获取发票详情没有数据返回:", res)
                }
            } else {
                console.error("无法获取到发票详情:", res)
                wx.showToast({
                    title: '获取账单失败，请稍后再试',
                    icon: 'none',
                })
            }
        })
    },
    contactOperate: function () {
        if (this.data.hasOperate) {
            wx.navigateTo({
                url: '../../../contactOperate/index',
            })
        } else {
            const phonenum = app.globalData.phoneNumber
            wx.makePhoneCall({
                phoneNumber: phonenum
            })
        }
    },
    confirmInvoice() {
        var that = this;
        wx.showModal({
            content: '确认开票前请仔细核对账单发票信息\r\n如对帐单金额及发票有异议\r\n请及时联系您的贝易资运营专员',
            confirmText: '确认开票',
            confirmColor: '#576B95',
            cancelText: '取消',
            success: function (res) {
                if (res.confirm) {
                    apply_invoice({
                        id: that.data.id
                    }).then(res => {
                        if (res.ret) {
                            wx.showModal({
                                content: '您的账单发票信息已确认成功\r\n贝易资在1个工作日内为您开具电子发票\r\n开具完成后将以短信方式通知你',
                                confirmText: '好的',
                                confirmColor: '#576B95',
                                showCancel: false
                            })
                        } else {
                            wx.showToast({
                                title: '开票请求失败: ' + res.message,
                                icon: 'none'
                            })
                        }
                    }).catch(e => {
                        console.error("请求开票失败:", e)
                        wx.showToast({
                            title: '开票请求失败',
                            icon: 'none'
                        })
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    checkEInvoice() {
        if (!this.data.id) {
            console.error("没有id")
            wx.showToast({
                title: '获取账单号失败，请稍后再试',
                icon: 'none',
            })
            return
        }
        wx.navigateTo({
            url: './eInvoice/index?vid=' + this.data.id,
        })
    }

})