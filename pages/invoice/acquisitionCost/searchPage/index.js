// pages/invoice/acquisitionCost/searchPage/index.js
const {
    searchBill
} = require('../../../../http/api/api_szpj')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        eventChannel: null,
        billFilter: null,
        searchKey: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('passSearchParams', function (data) {
            if (data instanceof Object && 'key' in data) {
                this.setData({
                    searchKey: data.key
                })
            }
            if (data instanceof Object && 'billFilter' in data) {
                this.setData({
                    billFilter: data.billFilter
                })
            }
            if (data instanceof Object && 'page' in data) {
                this.setData({
                    page: data.page
                })
            }
            if (data instanceof Object && 'pageSize' in data) {
                this.setData({
                    pageSize: data.pageSize
                })
            }
        })
        this.setData({
            eventChannel: eventChannel
        })
    },
    handleSearchKey: function(event){
        this.setData({searchKey: event.detail})
    },
    goSearch: function () {
        if(this.data.showFilter){
            // 筛选框打开状态 将目前的筛选框选出来
        }else{
            
        }
        let params = {
            page: this.data.page,
            page_size: this.data.pageSize,
        }
        if (this.data.searchKey) {
            params.search_key = this.data.searchKey
        }
        if (this.data.invoiceType) {
            params.invoice_type = Number(this.data.invoiceType)
        }
        if (this.data.status) {
            params.status = Number(this.data.status)
        }
        if (this.data.billStartTime) {
            params.bill_start_time = this.data.billStartTime
        }
        if (this.data.billEndTime) {
            params.bill_end_time = this.data.billEndTime
        }
        if (this.data.createStartTime) {
            params.create_start_time = this.data.createStartTime
        }
        if (this.data.createEndTime) {
            params.create_end_time = this.data.createEndTime
        }
        searchBill(params).then(res=>{
            console.log(res)
        })
    }
})