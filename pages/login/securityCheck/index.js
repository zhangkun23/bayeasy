// pages/login/securityCheck/index.js

const {
  getUserMeg,
  IdcardAuthentication,
  getUserStatus
} = require('../../../http/api/api');
const tempPath = getApp().globalData.imgPath;
Component({

  /**
   * 页面的初始数据
   */
  data: {
    inputClose: tempPath + "public/inputClose.png",
    info_max: tempPath + "public/info_max.png",
    idDard: '',
    disabled: false,
    isShowModal: false,
    buttons: [{
      text: '我知道了'
    }],
    securityCheckText: true,
    idcardValue: "",
    isShowCloseBtn: true,
    errorTips: "",
    userStatus: 0
  },
  pageLifetimes: {
    show() {
      this._getUserIdCards()
    }
  },
  lifetimes: {
    attached() {}
  },
  methods: {
    _getUserIdCards: function () {
      getUserMeg().then(res => {
        if (res.ret) {
          const dataInfo = res.data
          this.setData({
            idDard: dataInfo.id_card,
          })
        }
      })
    },
    onInput: function (event) {
      event.detail.value = event.detail.value.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
      this.setData({
        idcardValue: event.detail.value
      })
      this.setCloseIcon(event);
      if (event.detail.value.length == 22) {
        this.setData({
          disabled: true
        })
      } else {
        this.setData({
          disabled: false
        })
      }

    },
    setCloseIcon: function (val) {
      if (!val.detail.value) {
        this.setData({
          isShowCloseBtn: true
        })
      } else {
        this.setData({
          isShowCloseBtn: false
        })
      }
    },
    onFocus: function (event) {
      this.setCloseIcon(event);
    },
    onBlur: function () {
      this.setData({
        isShowCloseBtn: true
      })
    },
    closeValue: function () {
      this.setData({
        idcardValue: '',
        isShowCloseBtn: false
      })
    },
    // 提交身份证校验
    doConfirm() {
      let param = {
        id_card: this.data.idcardValue
      }
      IdcardAuthentication(param).then(res => {
        if (res.ret) {
          this.getStatus();
          wx.navigateTo({
            url: '../information',
          })
        } else {
          this.setData({
            errorTips: res.message
          })
          if (res.data.error_nums >= 5) {
            this.setData({
              isShowModal: true
            })
          }
        }
      })
    },
    // 修改全局状态
    getStatus() {
      getUserStatus().then(res => {
        if(res.ret) {
          getApp().globalData.userStatus =  res.data.status;
          this.setData({
            userStatus: res.data.status
          })
        }
      })
    },
    tapDialogButton() {
      this.setData({
        isShowModal: false
      })
    },
  },
})