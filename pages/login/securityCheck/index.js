// pages/login/securityCheck/index.js

const {
  getUserMeg,
  IdcardAuthentication,
  IDcardSubmit,
} = require('../../../http/api/api');

Component({

  /**
   * 页面的初始数据
   */
  data: {
    idDard: '362098198009229862',
    disabled: false,
    isShowModal: false,
    buttons: [{
      text: '我知道了'
    }],
    securityCheckText: true,
    idcardValue: "",
    isShowCloseBtn: true,
    errorTips: "校验不一致，请核实后重新填写"
  },
  lifetimes: {
    attached() {
      this._getUserIdCards()
    }
  },
  methods: {
    _getUserIdCards: function () {
      getUserMeg().then(res => {
        console.log(res, '个人信息')
        if (res.ret) {
          const dataInfo = res.data
          this.setData({
            idDard: dataInfo.id_card,
          })
        }
      })
    },
    onInput: function (event) {
      console.log(event.detail.value)
      event.detail.value = event.detail.value.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
      this.setData({
        idcardValue: event.detail.value
      })
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

    doConfirm(e) {
      console.log(e, 'weq', this.data.idcardValue)
      IdcardAuthentication({
        id_card: '142219199511105922'
        // id_card: this.data.idcardValue
      }).then(res => {
        let errorNum = res.data.error_nums;
        if (res.ret) {

          wx.navigateTo({
            url: '../information',
          })
        } else {
          if (errorNum < 5) {
            this.setData({
              securityCheckText: true,
              errorTips: res.data.message
            })
          } else if (errorNum == 5) {
            this.setData({
              isShowModal: true
            })
          }
        }
        console.log(res)
      })



    },

    tapDialogButton() {
      this.setData({
        isShowModal: false
      })
    },
  },
})