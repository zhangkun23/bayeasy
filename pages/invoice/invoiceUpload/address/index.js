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
        // var page = getCurrentPages()  ;// 获取当前页面栈
        // console.log(page)
        // var beforePage = page[page.length - 2]; // 跳转页面的栈
        // console.log(beforePage)
        // wx.navigateBack({
        //     success: function () {
        //         beforePage.onLoad(beforePage.route); // 执行前一个页面的onLoad方法
        //         console.log('11111')
        //     }
        // })
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
