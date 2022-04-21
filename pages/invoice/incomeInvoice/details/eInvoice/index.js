// pages/invoice/incomeInvoice/details/eInvoice/index.js
const app = getApp()
const {
    get_invoice_file
} = require('../../../../../http/api/api_szpj')

const {
    baseUrl
} = require('../../../../../http/request')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        showBg: true,
        invoices: null,
        // _vid: null,
        invoicePdfUrl: null,
        showClipDialog: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const vid = options.vid;
        let that = this;
        get_invoice_file(vid).then(res => {
            if (res.ret) {
                if (res.data instanceof Array && res.data.length > 0) {
                    that.setData({
                        invoices: res.data
                    })

                }
            } else {
                wx.showToast({
                    title: '出错了',
                    icon: 'none'
                })
                console.error("无法获取收入发票详情资源地址: ", res.message)
            }
        })
    },
    downloadPdf: function (e) {
        let that = this;
        const vid = e.currentTarget.dataset.vid
        const token = wx.getStorageSync('token') || ''
        const url = `${baseUrl}/invoice/download_invoice_file?id=${vid}&token=${token}`
        wx.setClipboardData({
            data: url,
            success: res => {
                wx.showModal({
                  content:"链接已复制，请在浏览器中访问。",
                  showCancel:false
                })
                // wx.showToast({
                //     title: '链接已复制',
                // })
            }
        })
        // wx.downloadFile({
        //     url: url,
        //     success: res => {
        //         let Path = res.tempFilePath
        //         wx.openDocument({
        //             filePath: Path, //要打开的文件路径
        //             showMenu: true,
        //             success: function (res) {
        //                 console.log('打开PDF成功');
        //             },
        //             fail: err => {
        //                 console.error("无法打开PDF :", err)
        //             }
        //         })
        //     }
        // })
    },
    previewImg: function (e) {
        const src = e.currentTarget.dataset.src
        wx.previewImage({
            urls: [src],
        })
    }

})