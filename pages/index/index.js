// index.js
// 获取应用实例

const {
  login,
  logout
} = require('../../http/api/api.js')
const tempPath = getApp().globalData.imgPath;
Component({
  data: {
    imgpath:tempPath + 'footer/null.png',
    banner: tempPath + 'index/banner.png',
    logo_byz: tempPath + 'public/logo_byz.png',
    cbfy: tempPath + 'index/cbfy.png',
    faq: tempPath + 'index/faq.png',
    nssb: tempPath + 'index/nssb.png',
    srzdfp: tempPath + 'index/srzdfp.png',
    zcjc: tempPath + 'index/zcjc.png',
    fwjs: tempPath + 'index/fwjs.png',
    daiban: tempPath +'index/daiban.png',
    dbNum:'11', //待办数量
    daibanShow:true,
  },

  methods: {
    handelClick() {
      wx.navigateTo({
        url: '../login/authentication/index',
      })
    },
    handelClickLogin(){
      wx.navigateTo({
        url: '../login/login/index',
      })
    },
    handelClickQqr(){

    }
  },

  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
    },

  },
})