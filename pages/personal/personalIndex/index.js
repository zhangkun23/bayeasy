// pages/personal/personalIndex/index.js
import '../../../component/login-btn/login-btn'

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
  properties: {},
  data: {
    btn_text: '退出登录',
    nbTitle: '个人中心',
    user_name: '*鲸鱼',
    user_tel: '134***8052',
    hasUserInfo: false,
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    right_arrow:'https://image.bayeasy.cn/images-data/personal/btns/right-arrow.png',
    entrances_info: [{
        icon: 'https://image.bayeasy.cn/images-data/personal/icons/contact-service.png',
        url: '',
        text: '联系运营专员'
      },
      {
        icon: 'https://image.bayeasy.cn/images-data/personal/icons/about-bayeasy.png',
        url: '',
        text: '关于贝易资'
      }
    ],
    gates_info: [{
      url: 'https://image.bayeasy.cn/images-data/personal/gates/person-info.png',
      text: '个人中心',
      width: '120rpx'
    }, {
      url: 'https://image.bayeasy.cn/images-data/personal/gates/my-sign.png',
      text: '我的签约',
      width: '120rpx'
    }, {
      url: 'https://image.bayeasy.cn/images-data/personal/gates/check-ticket.png',
      text: '开票查看',
      width: '120rpx'
    }, {
      url: 'https://image.bayeasy.cn/images-data/personal/gates/todo.png',
      text: '待办事项',
      width: '120rpx'
    }, ]
  },
  methods: {
    getUserProfile(e) {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
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
    }
  }

})