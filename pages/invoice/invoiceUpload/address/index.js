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
        logo: tempPath + 'invoice/invoiceUpdate/address.png',
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
      backIndex(){
        console.log( getCurrentPages())
        console.log('邮寄地址')
        wx.navigateBack({ //返回
            delta: 2
        })
      },
      getUserMeg(){
          getUserMeg().then(res => {
              if(res.ret){
                  this.setData({
                      form:res.data
                  })
              }
          })
      },
      copywxtap: function (e) {
        let param = [{
          name:'收货人',
          value:this.data.form.name,
        },
        {
          name:'电话号码',
          value:this.data.form.phone,
        },
        {
          name:'收货地址',
          value:this.data.form.address,
        }]
          wx.setClipboardData({
            data:`${param.map(item =>`${item.name}: ${item.value}`).join("\n")}`,
            success: function (res) {
              wx.getClipboardData({
                success: function (res) {
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
