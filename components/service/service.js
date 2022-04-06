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
        logo: getApp().globalData.imgPath + 'public/service.png',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handeClickOpenServe(){
            console.log(111)
            console.log()
            const operate = getApp().globalData.operate;
            if(operate){

            }else{
                wx.makePhoneCall({
                    phoneNumber: getApp().globalData.phoneNumber
                })
            }
            
        },
    }
})
