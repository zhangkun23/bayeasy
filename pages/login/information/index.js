// pages/login/information/index.js
const {
  IDcardSubmit,
  relation,
  getUserMeg,
  getUserIdCard,
  getUserStatus
} = require('../../../http/api/api');
const tempPath = getApp().globalData.imgPath;
const {
  baseUrl
} = require('../../../http/env.js').dev;
Component({
  /**
   * 页面的初始数据
   */
  data: {
    isShowModal: false,
    disable: true,
    form: {
      username: "",
      telephone: "",
      idcard: "",
      validUntil: "",
      validityPeriod: ''
    },
    showIdcardFront: false,
    showIdcardResever: false,
    showClose1: false,
    showClose2: false,
    showClose3: false,
    showClose4: false,
    buttons: [{
      text: '我知道了'
    }],
    front: "拍摄身份证正面",
    resever: "拍摄身份证反面",
    IdcardFront: tempPath + "authentication/idcard_ front.png",
    IdcardResever: tempPath + "authentication/idcard_resever.png",
    inputClose: tempPath + "public/inputClose.png",
    loading: tempPath + "public/loading.png",
    userStatus: 0,
    clearShow: true,
    tostTop: true,
    disabled: true,
    pickerShow: true,
    dateTime: '',
    title: "个人信息"
  },
  pageLifetimes: {
    show() {
      console.log(this.data.userStatus)
      const userStatus = getApp().globalData.userStatus;
      this.setData({
        userStatus: userStatus
      })
      this.initialization(userStatus);

      // 如果是查看状态不需要清除图表
      if (userStatus == 2) {
        this.setData({
          clearShow: false
        })
      } else {
        this.setData({
          tostTop: false
        })
      }
      this.setData({
        ['form.telephone']: wx.getStorageSync('mobile')
      })
    }
  },
  lifetimes: {
    detached() {
      wx.reLaunch({
        url: '../../index/index',
      })
    },
  },
  methods: {
    backIndex() {
      wx.reLaunch({
        url: '../../index/index',
      })
    },
    // 初始化判断全局状态 0  需要上传，此时贝易资库里没有信息  1 需要关联  2 已关联，查看详情
    initialization(userStatus) {

      if (userStatus == 1) {
        this._getUserIdCards();
        this.setData({
          title: '个人身份信息'
        })
      }
      if (userStatus == 2) {
        this._getUserIdCards();
      }
    },
    // 获取身份证信息
    _getUserIdCards: function () {
      getUserMeg().then(res => {
        // console.log(res, '个人信息')
        if (res.ret) {
          const dataInfo = res.data
          this.setData({
            form: {
              username: dataInfo.name,
              telephone: dataInfo.mobile,
              idcard: dataInfo.id_card,
              validUntil: dataInfo.identity_card_expire,
              validityPeriod: ''
            }
          })
        }
      })
      getUserIdCard('front').then(res => {
        let that = this;
        if (res.ret) {
          const image = res.data.image.replace(/[\r\n]/g, '');
          that.setData({
            IdcardFront: image,
            front: '身份证正面'
          })
        }
      })
      getUserIdCard('back').then(res => {
        if (res.ret) {
          const image = res.data.image.replace(/[\r\n]/g, '');
          this.setData({
            IdcardResever: image,
            resever: "身份证反面",
          })
        }
      })
    },

    // 上传图片
    uploadIdcard(e) {
      let that = this;
      const params = e.currentTarget.dataset; // 传入的参数
      wx.showActionSheet({
        itemList: ["从相册中选择", "拍照"],
        success: function (e) {
          //album:相册 返回0  //camera拍照   返回1  
          e.cancel || (0 == e.tapIndex ? that.chooseWxImageShop("album", params) : 1 == e.tapIndex && that.chooseWxImageShop("camera", params));
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      });
    },
    chooseWxImageShop: function (type, params) {
      var that = this;
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: [type],
        success: function (res) {
          if (res.tempFiles[0]) {
            const imgPath = res?.tempFiles[0].tempFilePath;
            const uploadUrl = baseUrl + '/personal_nformation/ocr_idcard?token=' + wx.getStorageSync('token')
            const type = params.idcadrparams; //正反面类型
            if (type == 'front') {
              that.setData({
                IdcardFront: imgPath,
                showIdcardFront: true
              })
            }
            if (type == 'back') {
              that.setData({
                IdcardResever: imgPath,
                showIdcardResever: true
              })
            }
            wx.uploadFile({
              url: uploadUrl,
              // header: {
              //   'Authorization': 'Bearer ' + wx.getStorageSync('token'),
              // },
              filePath: imgPath,
              name: 'link',
              formData: {
                'side': params.idcadrparams
              },
              success: function (res) {
                const data = JSON.parse(res.data);
                const dataInfo = data.data;
                if (data.ret) {
                  that.clearLoaddiing(type);
                  if (type == 'front') {
                    that.setData({
                      ['form.username']: dataInfo.name,
                      ['form.idcard']: dataInfo.id_card,
                    })
                  } else {
                    that.setData({
                      ['form.validUntil']: dataInfo.expire_date
                    })
                  }
                } else {
                  that.clearLoaddiing(type);
                  wx.showToast({
                    title: data.message,
                    icon: 'none'
                  })
                }
              },
              fail: function (res) {
                console.log(res, '失败')
              }
            })
          }
          let ImgArr = res.tempFiles;
          ImgArr.forEach(item => {
            if (item.size > 2097152) {
              wx.showModal({
                title: "提示",
                content: "选择的图片过大，请上传不超过2M的图片",
                showCancel: !1,
                success: function (e) {
                  e.confirm;
                }
              })
            }
          })
        }
      })
    },
    // 隐藏上传loadding
    clearLoaddiing(type) {
      if (type == 'front') {
        this.setData({
          showIdcardFront: false
        })
      }
      if (type == 'back') {
        this.setData({
          showIdcardResever: false
        })
      }
    },
    tapDialogButton(e) {
      this.setData({
        isShowModal: false
      })
      wx.switchTab({
        url: '/pages/index/index',
      })


    },
    // 子组建数据同步
    setInputValue(e) {
      let temp = `form.${e.detail.key}`
      this.setData({
        [temp]: e.detail.value //使用子组件的值
      })
    },
    toast(str) {
      wx.showToast({
        title: str,
        icon: 'none',
      })
      return true;
    },
    checkform(form) {
      if (!form.username && this.toast('请输入姓名')) return false;
      if (!form.telephone && this.toast('请输入手机号')) return false;
      if (!form.idcard && this.toast('请输入身份证号')) return false;
      if (!form.validUntil && this.toast('请输入身份证有效期')) return false;
      return true;
    },
    bindDateChange(event) {
      this.setData({
        ['form.validUntil']: event.detail.value
      })
    },
    // 提交
    confirmSubmit() {
      let form = this.data.form;
      if (this.checkform(form)) {
        let params = {
          name: form.username,
          mobile: form.telephone,
          id_card: form.idcard,
          expire_date: form.validUntil
        }
        IDcardSubmit(params).then(res => {
          if (res.ret) {
            this.seStatus();
            this.setData({
              isShowModal: true
            })
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
      }
    },
    seStatus() {
      getUserStatus().then(res => {
        if (res.ret) {
          getApp().globalData.userStatus = res.data.status;
          this.setData({
            userStatus: res.data.status
          })
        }
      })
    },

    // 确认关联 
    confirmAssociation() {
      relation({}).then(res => {
        if (res.ret) {
          this.seStatus();
          wx.navigateTo({
            url: '../association/index',
          })
        }
      })
    },
    // 是否绑定input日期事件
    inputShowClick(e) {
      if (e.detail.key == 'validUntil') {
        this.setData({
          pickerShow: true
        })
      }
    },
    // 日期插件取消
    bindcancel() {

    }
  },


})