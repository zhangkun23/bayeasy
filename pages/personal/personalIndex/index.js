// pages/personal/personalIndex/index.js
const {
  icons_url,
  btns_url,
  defaultAvatar
} = require('../config/config')
const {
  logout,
  feedbackStatus,
  getUserStatus
} = require('../../../http/api/api')
const {
  get_user_info
} = require('../../../http/api/api_grzx')
const utils = require('../../../utils/util.js')
const app = getApp()
Component({
  pageLifetimes: {
    show() {
      var that = this;
      utils.getTabBarIndex(this, 4);
      // 获取运营
      if (app.globalData.operate) {
        console.log("已有客服专员")
        const _entrances_info = this.data.entrances_info
        _entrances_info[0].text = "联系财税管家"
        this.setData({
          isOperate: app.globalData.operate,
          entrances_info: _entrances_info
        })
      }
      // 获取姓名 手机号 进行展示
      const _phone = wx.getStorageSync('mobile') || ''
      if (_phone) this.setData({
        user_tel: _phone
      });
      // 决定个人中心跳转
      const token = wx.getStorageSync('token') || '' // 可能从getStorage取
      const userStatus = app.globalData.userStatus
      // this.getCurrentUserStatus();

      // console.log(this.data.userStatus, userStatus)
      if (token) {
        get_user_info().then(res => {
          this.getFeedbackStatus(); // 留言接口
          this.getCurrentUserStatus();
          console.log("个人信息返回: ", res)
          if (res.data instanceof Object && 'name' in res.data) {
            that.setData({
              user_name: res.data.name || ''
              // user_name: ''
            })
          } else {
            console.log("无法获取姓名")
            that.setData({
              user_name: ''
            })
          }
          if (!that.data.user_tel && res.data.mobile) {
            console.log("从接口设定用户手机号")
            that.setData({
              user_tel: res.data.mobile
            })
          }
        })

        const _gate_info = this.data.gates_info
        if (userStatus === 0) {
          console.log('用户状态为0，不为贝易资用户')
          console.debug("有token但是userstatus为0 跳转完善个人信息")
          _gate_info[0].url = '../../login/authentication/index'
          this.setData({
            token: token,
            login_status: 0,
            isCheckRequired: true,
            showCompleteInfo: false,
            gates_info: _gate_info,
          })
        } else if (userStatus === 1) {
          console.log('用户状态为1，未关联')
          _gate_info[0].url = '../../login/securityCheck/index'
          this.setData({
            token: token,
            login_status: 1,
            isCheckRequired: true,
            showCompleteInfo: true,
            gates_info: _gate_info,
          })
        } else if (userStatus === 2) {
          console.log('用户状态为2，已关联')
          _gate_info[0].url = '../../login/information/index'
          this.setData({
            token: token,
            login_status: 2,
            isCheckRequired: false,
            showCompleteInfo: false,
            showModal: false,
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
      } else {
        console.log('没有token')
        return;
        console.log(token)
      }

      // 决定待办事项
      const todoCount = app.globalData.todolistNum;
      let isNewTodo;
      if (token && todoCount > 0) { // 登录且数量>0
        isNewTodo = true
      } else {
        isNewTodo = false
      }
      this.setData({
        isNewTodo: isNewTodo,
        todoCount: todoCount
      })
    },
    hide() {
      console.debug("personal index hide")
    },
  },
  lifetimes: {
    ready() {
      setTimeout(() => {
        this.setData({
          pageShow: true
        })
      }, 30)
    },
  },
  properties: {

  },
  data: {
    serviceModal: false,
    pageShow: false,
    token: '',
    login_status: 0, // app.globalData.???
    showCompleteInfo: null,
    isOperate: false,
    isNewTodo: false,
    defaultAvatar: defaultAvatar,
    todoCount: 0,
    isCheckRequired: false,
    hasUserInfo: false,
    showCompleteInformationModal: false,
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    showModal: false,
    btn_text: '退出登录',
    nbTitle: '个人中心',
    contents: ["为便于贝易资为您提供更为完善的服务", "需要您先完成身份信息安全校验"],
    btnUrl: '../../login/information/index',
    user_name: '', // name 和 tel 都应该存储在全局的info里
    user_tel: '',
    right_arrow: icons_url.right_arrow,
    userStatus: '',
    token: wx.getStorageSync('token') || '',
    isStatus: null,
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
      },
      {
        id: 3,
        icon: icons_url.feed_back,
        url: '/pages/faq/feedbackList/index',
        text: '留言反馈'
      },
      {
        id: 4,
        icon: icons_url.feed_back,
        url: '/pages/personal/myEmail/index',
        text: '我的邮箱'
      },
    ],
    gates_info: [{
      id: 1,
      icon: btns_url.personal,
      text: '个人信息',
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
      url: '../../invoice/incomeInvoice/index/index',
      text: '收入账单',
      width: '120rpx',
      isExtraInfo: false,
      extraInfo: null,
    }, {
      id: 3,
      url: '../../serviceFee/index/index',
      icon: btns_url.billingView,
      text: '服务费用',
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
    // 是否提交过留言
    getFeedbackStatus() {
      feedbackStatus().then(res => {
        if (res.ret) {
          this.setData({
            isStatus: res.data.status
          })
        }
      })
    },
    // 获取用户状态
    getCurrentUserStatus() {
      getUserStatus().then(res => {
        if (res.ret) {
          this.setData({
            userStatus: res.data.status
          })
        }
      })
    },
    gotoVerify() {
      if (this.data.userStatus == 0) {
        wx.navigateTo({
          url: '../../login/authentication/index',
        })
      } else if (this.data.userStatus == 1) {
        wx.navigateTo({
          url: '../../login/securityCheck/index',
        })
      }
    },
    goEntrance(e) {
      const userStatus = app.globalData.userStatus;
      let url = e.currentTarget.dataset.url;
      let isStatus = this.data.isStatus;

      if (url == '/pages/faq/feedbackList/index') {
        if (!this.data.token) {
          this.setData({
            showModal: true
          })
        } else {
          console.log(userStatus)
          if (userStatus < 2) {
            console.log(userStatus, '状态为<2')
            this.setData({
              showCompleteInformationModal: true
            })
          } else {
            console.log(userStatus, this.data.isStatus, '状态为=2')
            // this.setData({
            //   showCompleteInformationModal: false
            // })
            if (isStatus == 0) {
              url = '/pages/faq/feedback/index';
            } else {
              url = '/pages/faq/feedbackList/index';
            }
            console.debug("wx navi to ", e.currentTarget.dataset.url)
            wx.navigateTo({
              url: url
            })
          }
        }
      } else {
        wx.navigateTo({
          url: url
        })
      }
    },
    contactOperate(e) {
      // if (this.data.isOperate) {
      //   console.error("客户已有运营专员仍旧触发联系客服 ")
      // } else {
        // wx.navigateTo({
        //   url: '../../contactOperate/index',
        // })
        this.setData({
          serviceModal: true
        })
        // wx.makePhoneCall({
        //   phoneNumber: app.globalData.phoneNumber
        // })
      // }
    },
    goGate(e) {
      console.log(this.data.token)
      if (!this.data.token) {
        this.setData({
          showModal: true
        })
        return
      }

      if (this.data.userStatus == 0 || this.data.userStatus == 1) {
        this.setData({
          showCompleteInformationModal: true
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
          // console.log("get user profile result", res)
          // console.log(res);
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    },
    getUserInfo(e) {
      // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
      // console.log(e)
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