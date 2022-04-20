// pages/invoice/acquisitionCost/invoiceDetails/index.js
const app = getApp()
const {
    getAcquisitionDetails
} = require('../../../../http/api/api_szpj')
const {
    prod
} = require('../../../../http/env')
const {
    openPdf,
    nullToEmptyString
} = require('../../../../utils/util')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        audit_faild_reason: null,
        failure_reason: '',
        hasFile: null,
        pdfImg: app.globalData.imgPath + "invoice/incomeInvoice/pdfImg.png",
        emptyPic: app.globalData.emptyPic,
        passIcon: app.globalData.imgPath + 'invoice/acquisitionCost/passIcon.png',
        failIcon: app.globalData.imgPath + 'invoice/acquisitionCost/failIcon.png',
        invoiceIcon: app.globalData.imgPath + 'invoice/acquisitionCost/invoiceIcon.png',
        invoicePdfUrl: '',
        invoiceImgUrl: '',
        failReson: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const id = options.id;
        this.getInfo(id)
    },
    getInfo(aid) {
        var that = this
        getAcquisitionDetails(aid).then(res => {
            if (res.ret) {
                let info = nullToEmptyString(res.data)
                that.handleInfo(info)
            } else {
                console.log("无法获取详情:", res)
                wx.showToast({
                    title: '获取详情失败， 请稍后再试',
                    icon: 'none'
                })
            }
        }).catch(e => {
            console.error("网络出错,请检查网络连接 :", e)
        })
    },
    handleInfo: function (info) {
        if (!info instanceof Object) {
            return
        }
        // 处理发票文件展示
        if ('pdf_url' in info && info['pdf_url']) {
            this.setData({
                pdfUrl: info['pdf_url']
            })
        } else if ('file_image' in info && info['file_image']) {
            this.setData({
                invoiceImgUrl: info['file_image']
            })
        }
        if (info.status === 2) {
            const __fail_reason = info.failure_reason
            this.setData({
                audit_faild_reason: info.audit_faild_reason,
                failure_reason: info.failure_reason
            })
            console.log("审核失败原因: ", __fail_reason)
        }
        this.setData({
            status: info.status,
            invoice_type: info.invoice_type,
            invoice_dm: info.invoice_dm,
            invoice_hm: info.invoice_hm,
            total_amount: info.total_amount,
            seller_name: info.seller_name,
            invoice_date: info.invoice_date,
            create_time: info.time
        })
    },
    goPdf() {
        openPdf(this.data.pdfUrl)
    },
    // handleBackArrow: function(){
    //     setTimeout(() => {
    //         wx.redirectTo({
    //             url: '/pages/invoice/acquisitionCost/index',
    //             fail: (e) => {
    //                 console.log("fail redirect: ", e)
    //             },
    //         })
    //     }, 0);
    // },
})