// pages/login/securityCheck/index.js

const {
  getUserMeg,
  IdcardAuthentication,
} = require('../../../http/api/api');
const tempPath = getApp().globalData.imgPath;
Component({

  /**
   * 页面的初始数据
   */
  data: {
    inputClose:tempPath+"public/inputClose.png",
    info_max:tempPath+"public/info_max.png",
    idDard: '',
    disabled: false,
    isShowModal: false,
    buttons: [{
      text: '我知道了'
    }],
    securityCheckText: true,
    idcardValue: "",
    isShowCloseBtn: true,
    errorTips: ""
  },
  pageLifetimes: {
    show() {
      this._getUserIdCards()
    }
  },
  lifetimes: {
    attached() {
    }
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
      if(event.detail.value.length == 22){
        this.setData({
          disabled: true
        })
      }else{
        this.setData({
          disabled: false
        })
      }
    },
    onFocus: function () {
      this.setData({
        isShowCloseBtn: true
      })
    },
    onBlur: function () {
      this.setData({
        isShowCloseBtn: false
      })
    },
    closeValue: function () {
      console.log(123)
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
          wx.navigateTo({
            url: '../information',
          })
        } else {
            this.setData({
              errorTips: res.message
            })
          if (res.data.error_nums == 5) {
            this.setData({
              isShowModal: true
            })
          }
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