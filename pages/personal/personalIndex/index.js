// pages/personal/personalIndex/index.js
const {
  icons_url,
  btns_url,
  defaultAvatar
} = require('../config/config')
const {
  logout
} = require('../../../http/api/api')
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
      // console.debug("prepare to get avatar")
      // if (wx.getUserProfile) {
      //   this.setData({
      //     canIUseGetUserProfile: true
      //   })
      // }
      // 获取运营
      if (app.globalData.operate) {
        console.debug("已有客服专员")
        const _entrances_info = this.data.entrances_info
        _entrances_info[0].text = "联系运营专员"
        this.setData({
          isOperate: app.globalData.operate,
          entrances_info: _entrances_info
        })
      }
      // 获取姓名 手机号 进行展示
      const _phone = app.globalData.mobile;
      if (_phone) this.setData({
        user_tel: _phone
      });
      // 决定个人中心跳转
      const token = wx.getStorageSync('token') || '' // 可能从getStorage取
      const userStatus = app.globalData.userStatus

      if (token) {
        const _gate_info = this.data.gates_info
        if (userStatus === 0) {
          console.debug("有token但是userstatus为0 跳转完善个人信息")
          // _gate_info[0].url = '../../login/securityCheck/index'
          _gate_info[0].url = '../../login/authentication/index'
          this.setData({
            token: token,
            login_status: 0,
            isCheckRequired: true,
            showCompleteInfo: false,
            gates_info: _gate_info,
          })
        } else if (userStatus === 1) {
          _gate_info[0].url = '../../login/securityCheck/index'
          this.setData({
            token: token,
            login_status: 1,
            isCheckRequired: true,
            showCompleteInfo: true,
            gates_info: _gate_info,
          })
        } else if (userStatus === 2) {
          _gate_info[0].url = '../../login/information/index'
          this.setData({
            token: token,
            login_status: 2,
            isCheckRequired: false,
            showCompleteInfo: false,
            gates_info: _gate_info,
          })
        } else {
          this.setData({
            token: token,
            login_status: 0,
            isCheckRequired: false,
            showCompleteInfo: false
          })

        }
      }

      // 决定待办事项
      const todoCount = app.globalData.todolistNum
      if (todoCount > 0 && token) {
        this.setData({
          isNewTodo: true,
          todoCount: todoCount
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
    token: '',
    login_status: 0, // app.globalData.???
    showCompleteInfo: null,
    isOperate: false,
    isNewTodo: false,
    defaultAvatar: defaultAvatar,
    todoCount: 0,
    isCheckRequired: false,
    hasUserInfo: false,
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    showModal: false,
    btn_text: '退出登录',
    nbTitle: '个人中心',
    btnUrl: '../../login/information/index',
    user_name: '', // name 和 tel 都应该存储在全局的info里
    user_tel: '',
    right_arrow: icons_url.right_arrow,
    entrances_info: [{
        id: 1,
        icon: icons_url.contact_operate,
        url: '/pages/contactOperate/index',
        text: '联系客服'
      },
      {
        id: 2,
        icon: icons_url.about_bayeasy,
        url: '/pages/personal/aboutBayeasy/index',
        text: '关于贝易资'
      }
    ],
    gates_info: [{
      id: 1,
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
      id: 2,
      icon: btns_url.incomeList,
      text: '收入账单',
      width: '120rpx',
      isExtraInfo: false,
      extraInfo: null,
    }, {
      id: 3,
      icon: btns_url.costBill,
      text: '成本发票',
      width: '120rpx',
      isExtraInfo: false,
      extraInfo: null
    }, {
      id: 4,
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
    contactOperate(e) {
      if (this.data.isOperate) {
        console.error("客户已有运营专员仍旧触发联系客服 ")
      } else {
        wx.makePhoneCall({
          phoneNumber: app.globalData.phoneNumber
        })
      }
    },
    goGate(e) {
      if (!this.data.token) {
        this.setData({
          showModal: true
        })
        return
      }
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
    userLogout() {
      logout().then(res => {
        if (res.ret) {
          console.log("logout success")
        } else {
          console.warning("logout token expired")
          //todo: token过期之后的逻辑
        }
      }).catch(e => {
        console.error("logout request error", e)
      })
      wx.setStorageSync('token', '') // 清理缓存中token
      wx.clearStorage({
        success: (res) => {
          console.log("清理缓存成功")
        },
      })
      app.globalData.userStatus = ''
      app.globalData.todolistNum = 0
      app.globalData.operate = false
      this.setData({
        token: '',
        isOperate: false,
        todoCount: 0,
        showCompleteInfo: null,
        isCheckRequired: false
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