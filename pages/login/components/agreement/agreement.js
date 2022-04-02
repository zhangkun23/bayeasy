// pages/login/components/agreement.js
const tempPath = getApp().globalData.imgPath;
const utils = require('../../../../utils/util.js')
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
        loginSelect: tempPath + 'login/loginSelect.png',
        loginUnSelect: tempPath + 'login/loginUnSelect.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handelClick(event){
            const type = event.currentTarget.dataset.type;
            utils.openPdf(type)
        }

    }
})
