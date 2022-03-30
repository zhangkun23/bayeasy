// index.js
// 获取应用实例

const { login,logout} = require('../../http/api/api.js')
Component({
  data:{
    imgpath:getApp().globalData.imgPath +'footer/null.png',
    banner:getApp().globalData.imgPath +'index/banner.png',
    logo_byz:getApp().globalData.imgPath +'public/logo_byz.png',
    cbfy:getApp().globalData.imgPath +'index/cbfy.png',
    faq:getApp().globalData.imgPath +'index/faq.png',
    nssb:getApp().globalData.imgPath +'index/nssb.png',
    srzdfp:getApp().globalData.imgPath +'index/srzdfp.png',
    zcjc:getApp().globalData.imgPath +'index/zcjc.png',
  },
 

  methods:{
    handelClick(){
      console.log("晚上个人信息")
    },
  },
  
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }

      let param = {
        mobile:'18513136572',
        captcha:'111111'
      }

      // login(param).then((res)=>{
      //   if(res.ret){
      //     getApp().globalData.token = res.data.access_token;
      //   }
      // })

      // logout().then((res)=>{
      //   console.log(res);
      // })
      

    },


  }
})
