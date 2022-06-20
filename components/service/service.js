// pages/login/components/service.js
const app = getApp()
const utils = require('../../utils/util.js');
const {
    operateList
} = require('../../http/api/api_grzx')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // contact: {
        //     type: String,
        //     value: "客服"
        // },
        title: {
            type: String,
            value: "联系贝易资"
        },
        type: {
            type: String,
            value: ''
        },

    },
    pageLifetimes: {
        show() {
            this.getOperateList();
            // console.log(this.data.title)
            let token = wx.getStorageSync('token') || '';
            if (token) {
                this.setData({
                    title: "联系贝易资"
                })
            } else {
                this.setData({
                    title: "在线客服"
                })
            }
        }
    },

    attached() {
        console.log(this.data.type,'客服')
    },

    /**
     * 组件的初始数据
     */
    data: {
        logo: getApp().globalData.imgPath + 'public/service.png',
        showModal: false,
    },
    /**
     * 组件的方法列表
     */
    methods: {
        handeClickOpenServe() {
            console.log(134234324234524)
            let token = wx.getStorageSync('token') || '';
            // console.log(token)
            // if (token) {
                this.setData({
                    showModal: true
                })
                console.log(this.data.showModal)
            // }
            // if(this.data.title == '联系财税管家') {
            //     const operate = getApp().globalData.operate;
            //     if (operate) {
            //         wx.navigateTo({
            //             url: '/pages/contactOperate/index',
            //         })
            //     } else {
            //         wx.makePhoneCall({
            //             phoneNumber: getApp().globalData.phoneNumber
            //         })
            //     }
            // } else {
            //     wx.makePhoneCall({
            //         phoneNumber: getApp().globalData.phoneNumber
            //     })
            // }
        },


        // 获取运营人员列表
        getOperateList() {
            operateList().then(res => {
                if (res.ret) {
                    let data = res.data;
                    data.map(item => {
                        if (item.label_name == '财务运营') {
                            item.type = 'financialOperations'
                        } else if (item.label_name == '开票运营') {
                            item.type = 'billingSpecialist'
                        } else if (item.label_name == '商务运营') {
                            item.type = 'businessOperation'
                        }
                    })
                    this.setData({
                        serviceList: data
                    })
                    console.log(data, '在线客服')
                }
            })
        },
    }
})