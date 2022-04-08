// pages/login/information/index.js
const {
  IDcardSubmit,
  relation,
  getUserMeg,
  getUserIdCard,
} = require('../../../http/api/api');
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
      validUntil: '',
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
    IdcardFront: "https://image.bayeasy.cn/images-data/authentication/idcard_ front.png",
    IdcardResever: "https://image.bayeasy.cn/images-data/authentication/idcard_resever.png",
    // status: 2
    status: getApp().globalData.userStatus 
  },
  lifetimes: {
    attached() {
      this.initialization();
    },
  },
  methods: {
    // 初始化判断全局状态 0  需要上传，此时贝易资库里没有信息  1 需要关联  2 已关联，查看详情
    initialization() {
      let that = this;
      if (that.data.status == 0) {
        that.data.form = {
          username: "",
          telephone: "",
          idcard: "",
          validUntil: "",
        }
      } else if (that.data.status == 1 || that.data.status == 2) {
        that._getUserIdCards();
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
        let that = this;
        if (res.ret) {
          const image = res.data.image.replace(/[\r\n]/g, '');
          that.setData({
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
                      telephone: wx.getStorage('mobile') ? wx.getStorage('mobile') : that.data.form.telephone,
                      validUntil: dataInfo.start_date ? dataInfo.start_date + '-' + dataInfo.expire_date : that.data.form.validUntil,
                      validityPeriod: dataInfo.expire_date
                    }
                  })
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
    // 提交
    confirmSubmit(e) {
      let that = this;
      console.log(e,that.data)
      // return;
      if (that.data.form.username == '') {
      console.log(2)
        wx.showToast({
          title: '请输入姓名',
          icon: "error"
        })
      } else if (that.data.form.telephone == '') {
      console.log(3)
      wx.showToast({
          title: '请输入手机号',
          icon: "error"
        })
      } else if (that.data.form.idcard == '') {
      console.log(4)
        wx.showToast({
          title: '请输入身份证号',
          icon: "error"
        })
      } else if (that.data.form.validityPeriod == '') {
      console.log(5)
        wx.showToast({
          title: '请输入身份证有效期',
          icon: "error"
        })
      } else {
      console.log(6)
        let params = {
          name: that.data.form.username,
          mobile: that.data.form.telephone,
          id_card: that.data.form.idcard,
          expire_date: that.data.form.validityPeriod
        }
        console.log(params)
        // IDcardSubmit(params).then(res => {
        //   if (res.ret) {
        //     this.setData({
        //       isShowModal: true
        //     })
        //   } else {
        //     wx.showToast({
        //       title: res.message,
        //       icon: 'none'
        //     })
        //   }
        // })
      }
    },
    clearValue(e) {
      console.log(999)
      let params = e.currentTarget.dataset.params;
      console.log(e)
      if (params == "name") {
        if (this.data.form.username !== '') {
          this.setData({
            showClose1: true
          })
        }
        this.setData({
          form: {
            username: "",
          },
          showClose1: false,
        })
      } else if (params == "telephone") {
        if (this.data.form.telephone !== '') {
          this.setData({
            showClose2: true
          })
        }
        this.setData({
          form: {
            telephone: "",
          },
          showClose2: false,
        })
      } else if (params == "idcard") {
        if (this.data.form.idcard !== '') {
          this.setData({
            showClose3: true
          })
        }
        this.setData({
          form: {
            idcard: "",
          },
          showClose3: false,
        })
      } else if (params == "validityPeriod") {
        if (this.data.form.validUntil !== '') {
          this.setData({
            showClose4: true
          })
        }
        this.setData({
          form: {
            validUntil: "",
          },
          showClose4: false,
        })
      }
    },
    onInput(event) {
      let that = this;
      let params = event.currentTarget.dataset.params;
      let value = event.detail.value;
      console.log(value,event.detail)
      if (params == "name") {
        if (value !== '') {
          this.setData({
            form: {
              username: value,
            },
          })
        }
      } else if (params == "telephone") {
        if (value !== '') {
          this.setData({
            form: {
              username: that.data.form.username,
              telephone: value,
            },
          })
        }
      } else if (params == "idcard") {
        if (value !== '') {
          this.setData({
            form: {
              username: that.data.form.username,
              telephone: that.data.form.value,
              idcard: value,
            },
          })
        }
      } else if (params == "validityPeriod") {
        if (value !== '') {
          this.setData({
            form: {
              username: that.data.form.username,
              telephone: that.data.form.value,
              idcard: that.data.form.idcard,
              validUntil: value,
            },
          })
        }
      }
    },
    onFocus(e) {
      let params = e.currentTarget.dataset.params;
      console.log(params, 'onfocus')
      if (params == "name") {
        this.setData({
          showClose1: true
        })
      } else if (params == "telephone") {
        this.setData({
          showClose2: true
        })
      } else if (params == "idcard") {
        this.setData({
          showClose3: true
        })
      } else if (params == "validityPeriod") {
        this.setData({
          showClose4: true
        })
      }
    },
    onBlur(e) {
      let params = e.currentTarget.dataset.params;
      if (params == "name") {
        this.setData({
          showClose1: false
        })
      } else if (params == "telephone") {
        this.setData({
          showClose2: false
        })
      } else if (params == "idcard") {
        this.setData({
          showClose3: false
        })
      } else if (params == "validityPeriod") {
        this.setData({
          showClose4: false
        })
      }
    },


    // 确认关联 
    confirmAssociation() {
      relation({}).then(res => {
        console.log(res)
        if(res.ret) {
          wx.navigateTo({
            url: '../association/index',
          })
        }
      })
    },

  },


})