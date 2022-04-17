// pages/invoice/invoiceUpload/components/updateImageInfo_errInfo/index.js
const tempPath = getApp().globalData.imgPath;
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        errInfo: { //input名称
            type: Object,
            value: [
                {
                    invoice_hm:123123123,
                    invoice_type: 2,
                    seller_name: '北京上帝',
                    message: '该发票已存在，请勿重复提交！'
                },
                {
                    invoice_hm:23423423,
                    invoice_type: 2,
                    seller_name: '难听们',
                    message: '该发票已存在，请勿重复提交！'
                },
            ]
        },
        errInfoShow:{
            type:Boolean,
            value:false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        info_max: tempPath + "public/info_max.png",

    },

    /**
     * 组件的方法列表
     */
    methods: {
        handelClick(){
            this.triggerEvent('errInfoCloseOrShow', {})
        }
    }
})
