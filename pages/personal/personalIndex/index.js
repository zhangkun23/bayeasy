// pages/personal/personalIndex/index.js
const {
  icons_url,
  btns_url
} = require('../config/config')

const app = getApp()
Component({
  pageLifetimes: {
    show() {
      // 设定tabbar
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 4
        })
      }
      // 获取头像相关权限
      console.debug("prepare to get avatar")
      if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        })
      }
    },
    hide() {
      console.debug("personal index hide")
    },
  },
  properties: {

  },
  data: {
    login_status: 0, // app.globalData.???
    isFileComplete: true,
    hasUserInfo: false,
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    showModal: false,
    btn_text: '退出登录',
    nbTitle: '个人中心',
    user_name: '', // name 和 tel 都应该存储在全局的info里
    user_tel: '',
    right_arrow: icons_url.right_arrow,
    entrances_info: [{
        icon: icons_url.contact_operate,
        url: '/pages/personal/contactStaff/index',
        text: '联系运营专员'
      },
      {
        icon: icons_url.about_bayeasy,
        url: '/pages/personal/aboutBayeasy/index',
        text: '关于贝易资'
      }
    ],
    gates_info: [{
      icon: btns_url.personal,
      text: '个人中心',
      width: '120rpx',
      isExtraInfo: true,
      extraInfo: {
        left: '50%',
        top: '4rpx',
        type: 0,
      }
    }, {
      icon: btns_url.incomeList,
      text: '收入账单',
      width: '120rpx',
      isExtraInfo: false,
      extraInfo: null,
    }, {
      icon: btns_url.costBill,
      text: '成本发票',
      width: '120rpx',
      isExtraInfo: false,
      extraInfo: null
    }, {
      url: '../../todo/todo',
      icon: btns_url.todoList,
      text: '待办事项',
      width: '120rpx',
      isExtraInfo: true,
      extraInfo: {
        left: '50%',
        top: '4rpx',
        type: 1,
        count: 4
      }
    }, ]
  },
  methods: {
    goEntrance(e) {
      console.debug("wx navi to ", e.currentTarget.dataset.url)
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
        events: {},
        success: function (res) {
          res.eventChannel.emit('acceptDataFromOpenerPage', {
            data: 'test'
          })
        }
      })

    },
    goGate(e) {
      const _url = e.currentTarget.dataset.url
      console.debug("go gate", _url)
      wx.navigateTo({
        url: _url 
      })
    },
    goLogin(e) {
      console.debug("go login")
      wx.navigateTo({
        url: '/pages/login/login/index',
      })
    },
    getUserProfile(e) {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log("get user profile result", res)
          console.log(res);
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    },
    getUserInfo(e) {
      // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
      console.log(e)
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },
    getPhoneNumber(e) {
      console.log(e.detail.code)
    }
  }
})