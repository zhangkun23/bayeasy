// pages/invoice/invoiceUpload/address.js
const tempPath = getApp().globalData.imgPath;
const {getUserMeg} = require('../../../../http/api/api_szpj.js')
Component({
    pageLifetimes: {
        show() {
            this.getUserMeg()
        }
    },
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 
     * 组件的初始数据
     */
    data: {
        logo: tempPath + 'public/logo.png',
        form:{
            name:'',
            phone:'',
            address:""
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        getUserMeg(){
            getUserMeg().then(res => {
                console.log(res)
                if(res.ret){
                    this.setData({
                        form:{
                            address: "北京市海淀区中关村大街11号9层908",
                            name: "贝易资",
                            phone: "010-82887950"
                        }
                    })
                }
            })
        },
        copywxtap: function (e) {
            console.log(e.currentTarget.dataset.text)
           wx.setClipboardData({
             data:'测试赋值功能1111',
             success: function (res) {

               wx.getClipboardData({
                 //这个api是把拿到的数据放到电脑系统中的
                 success: function (res) {
                   console.log(res.data) // data
                   wx.showToast({
                     title: '复制成功',
                     icon:'none'
                   })
                 }
               })

             }
           })
        }
    }
})
