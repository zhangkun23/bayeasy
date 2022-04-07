// pages/login/information/index.js
const {
  IDcardSubmit,
  relation,
  getUserMeg,
  getUserIdCard,
} = require('../../../http/api/api');
const {
  baseUrl
} = require('../../../http/env').dev;
Component({
  /**
   * 页面的初始数据
   */
  data: {
    isShowModal: false,
    form: {
      username: "",
      telephone: "",
      idcard: "",
      validUntil: '',
      validityPeriod: ''
    },
    showIdcardFront: false,
    showIdcardResever: false,
    showClose: false,
    buttons: [{
      text: '我知道了'
    }],
    front: "拍摄身份证正面",
    resever: "拍摄身份证反面",
    IdcardFront: "https://image.bayeasy.cn/images-data/authentication/idcard_ front.png",
    IdcardResever: "https://image.bayeasy.cn/images-data/authentication/idcard_resever.png",
    status: getApp().globalData.userStatus || 1
  },
  lifetimes: {
    attached() {
      console.log(this.data.status)
      this.initialization();
    },
    moved() {
      console.log('moved')
    },
    detached() {
      console.log('detacged')
    }
  },
  methods: {
    // 初始化判断全局状态 0  需要上传，此时贝易资库里没有信息  1 需要关联  2 已关联，查看详情
    initialization() {
      console.log(this)
      let that = this;
      if (that.data.status == 0) {
        console.log('上传，此时贝易资库里没有信息')
        that.data.form = {
          username: "",
          telephone: "",
          idcard: "",
          validUntil: "",
        }
      } else if (that.data.status == 1) {
        console.log('需要关联')
        that._getUserIdCards()
      } else if (that.data.status == 2) {
        console.log('已关联，查看详情')
      }
    },
    // 获取身份证信息
    _getUserIdCards: function () {
      getUserMeg().then(res => {
        console.log(res, '个人信息')
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
      const res1 = getUserIdCard('front');
      const res2 = getUserIdCard('back');
      this.setData({
        IdcardFront: baseUrl + res1,
        IdcardResever: baseUrl + res2,
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
            const uploadUrl = 'http://gsh.dev.corp.bayeasy.cn:11880/gshApi/personal_nformation/ocr_idcard'
            if (params.idcadrparams == 'front') {
              that.setData({
                IdcardFront: imgPath,
                showIdcardFront: true
              })
            }
            if (params.idcadrparams == 'back') {
              that.setData({
                IdcardResever: imgPath,
                showIdcardResever: true
              })
            }
            wx.uploadFile({
              url: uploadUrl,
              header: {
                'Authorization': 'Bearer ' + wx.getStorageSync('token'),
              },
              filePath: imgPath,
              name: 'link',
              formData: {
                'side': params.idcadrparams
              },
              success: function (res) {
                const data = JSON.parse(res.data);
                const dataInfo = data.data;
                console.log(data, '成功')
                if (data.ret) {
                  if (params.idcadrparams == 'front') {
                    that.setData({
                      showIdcardFront: false
                    })
                  }
                  if (params.idcadrparams == 'back') {
                    that.setData({
                      showIdcardResever: false
                    })
                  }
                  that.setData({
                    form: {
                      username: dataInfo.name ? dataInfo.name : that.data.form.username,
                      idcard: dataInfo.id_card ? dataInfo.id_card : that.data.form.idcard,
                      telephone: getApp().globalData.mobile ? getApp().globalData.mobile : that.data.form.telephone,
                      validUntil: dataInfo.start_date ? dataInfo.start_date + '-' + dataInfo.expire_date : that.data.form.validUntil,
                      validityPeriod: dataInfo.expire_date
                    }
                  })
                  console.log(getApp().globalData)
                } else {
                  wx.showToast({
                    title: res.message,
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
    tapDialogButton(e) {
      this.setData({
        isShowModal: false
      })
      wx.switchTab({
        url: '/pages/index/index',
      })
    },

    confirmSubmit(e) {
      let query = this.getUrlOption();
      console.log(query)
      if (this.data.form.username == '') {
        wx.showToast({
          title: '请输入姓名',
          icon: "error"
        })
        return
      } else if (this.data.form.telephone == '') {
        wx.showToast({
          title: '请输入手机号',
          icon: "error"
        })
        return
      } else if (this.data.form.idcard == '') {
        wx.showToast({
          title: '请输入身份证号',
          icon: "error"
        })
        return
      } else if (this.data.form.validityPeriod == '') {
        wx.showToast({
          title: '请输入身份证有效期',
          icon: "error"
        })
        return
      }

      let params = {
        name: this.data.form.username,
        mobile: this.data.form.telephone,
        id_card: this.data.form.idcard,
        expire_date: this.data.form.validityPeriod
      }
      console.log(params)
      IDcardSubmit(params).then(res => {
        console.log(res)
        if (res.ret) {
          console.log(3)
          this.setData({
            isShowModal: true
          })
        } else {
          console.log(4)
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      })
    },

    // 确认关联 
    confirmAssociation() {
      // relation({}).then(res => {
      //   console.log(res)
      // } )
      wx.navigateTo({
        url: '../association/index',
      })
    },

  },


})