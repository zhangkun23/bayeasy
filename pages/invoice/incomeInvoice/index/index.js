// pages/invoice/incomeInvoice/index/index.js
const {
    get_all_invoices
} = require('../../../../http/api/api_szpj')
const app = getApp()
// const INVOICE_STATUS = {
//     0: '待确认',
//     1: '开票中',
//     2: '开票中',
//     3: '已开票',
//     8: '开票中',
//     9: '开票中'
// }
const INVOICE_STATUS_WAIT = [0]
const INVOICE_STATUS_GOING = [1, 2, 8, 9]
const INVOICE_STATUS_DONE = [3]
const SPLIT_HANZI = '至'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        showNav: true,
        isInvoiceEmpty: false,
        btnStyle: {
            width: '100%',
            height: '100%'
        },
        emptyPic: app.globalData.emptyPic,
        invoice_lists: [],
    },
    onShow: function (options) {
        var that = this
        get_all_invoices().then(res => {
            if (res.ret) {
                if (res.data instanceof Array && res.data.length > 0) {
                    that.handleData(res.data)
                } else {
                    this.setData({
                        isInvoiceEmpty: true
                    })
                }
            } else {
                console.error("无法获取到发票列表:", res)
                wx.showToast({
                    title: '获取账单失败，请稍后再试',
                    icon: 'none',
                })
            }
        })
    },
    goDetails: function (e) {
        const _id = e.currentTarget.dataset.iid
        wx.navigateTo({
            url: '../details/index?id=' + _id,
        })
    },
    onPullDownRefresh: function () {
        console.debug('更新收入账单发票列表')
        this.onShow();
        wx.stopPullDownRefresh();
    },
    handleData(info){
        var that = this
        let _invoice_infos = []
        info.forEach(d => {
            // title
            if (INVOICE_STATUS_WAIT.includes(d.status_code)) {
                d.myStatus = 0
            } else if (INVOICE_STATUS_GOING.includes(d.status_code)) {
                d.myStatus = 1
            } else if (INVOICE_STATUS_DONE.includes(d.status_code)) {
                d.myStatus = 2
            }
            // datetime
            const __date = d.time.split(SPLIT_HANZI)
            if (__date instanceof Array && __date.length === 2) {
                d.dateFrom = __date[0]
                d.dateTo = __date[1]
            } else {
                console.error("分解日期错误", d)
                d.dateFrom = '未知'
                d.dateTo = '未知'
            }
            _invoice_infos.push(d)
        });
        // _invoice_infos.sort(function (a, b) {
        //     return new Date(b.dateTo) - new Date(a.dateTo);
        // });
        // const ___invoice_infos = _invoice_infos.concat(_invoice_infos)

        that.setData({
            invoice_lists: _invoice_infos
        },() => {
            var query = wx.createSelectorQuery()
            query.select('#card').boundingClientRect(function (res) {
                console.debug("card attributes", res);
                that.setData({
                    initY: res.top - 10 // 增加用户体验 
                })
            }).exec();
        })
    }
})