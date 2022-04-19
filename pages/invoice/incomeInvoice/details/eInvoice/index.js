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
        _vid: null,
        invoicePdfUrl: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const vid = options.vid;
        // this.setData({_vid: vid})
        let that = this;
        get_invoice_file(vid).then(res => {
            if (res.ret) {
                console.log(res)
                if (res.data instanceof Array && res.data.length > 0) {
                    const data = res.data[0]
                    if (data instanceof Object && 'invoice_img_file' in data) {
                        that.setData({
                            _vid: data['id'],
                            invoicePdfUrl: data['invoice_img_file']
                        })
                    }
                }
            } else {

            }
        })
    },
    downloadPdf: function () {
        const token = wx.getStorageSync('token') || ''
        const url = `${baseUrl}/invoice/download_invoice_file?id=${this.data._vid}&token=${token}`
        wx.downloadFile({
            url: url,
            success: res => {
                let Path = res.tempFilePath
                wx.openDocument({
                    filePath: Path, //要打开的文件路径
                    showMenu: true,
                    success: function (res) {
                        console.log('打开PDF成功');
                    },
                    fail: err => {
                        console.error("无法打开PDF :", err)
                    }
                })
            }
        })
    }

})