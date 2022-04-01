// pages/login/components/service.js
const utils = require('../../utils/util.js')
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        logo: getApp().globalData.imgPath + 'public/logo.png',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handeClickOpenServe(){
            wx.makePhoneCall({
                phoneNumber: getApp().globalData.phoneNumber
            })
        },
    }
})
