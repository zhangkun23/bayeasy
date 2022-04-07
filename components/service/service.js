// pages/login/components/service.js
const utils = require('../../utils/util.js')
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },
    pageLifetimes: {
        show() {
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        logo: getApp().globalData.imgPath + 'public/service.png',
    },
    /**
     * 组件的方法列表
     */
    methods: {
        handeClickOpenServe(){
            const operate = getApp().globalData.operate;
            if(operate){
                wx.navigateTo({
                    url: '/pages/contactOperate/index',
                  })
            }else{
                wx.makePhoneCall({
                    phoneNumber: getApp().globalData.phoneNumber
                })
            }
        },
    }
})
