// pages/login/information/index.js
const {
  IDcardSubmit,
  IdcardAuthentication
} = require('../../../http/api/api');

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
    IdcardResever: "https://image.bayeasy.cn/images-data/authentication/idcard_resever.png"
  },

  methods: {

    // 上传图片
    uploadIdcard(e) {
      console.log(this.data.a)
      const params = e.currentTarget.dataset; // 传入的参数
      console.log(params)
      let that = this;
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
      console.log(e.detail)
      this.setData({
        isShowModal: false
      })
      wx.switchTab({
        url: '/pages/index/index',
      })
    },

    confirmSubmit(e) {
      if (this.data.form.username == '' || this.data.form.telephone == '' || this.data.form.idcard == '' || this.data.form.validityPeriod == ''){
        wx.showToast({
          title: '请输入内容',
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
      // 先去验证  验证成功之后去提交
      // IdcardAuthentication({
      //   id_card: this.data.form.idcard
      // }).then(res => {
      //   if (res.ret) {
      //     console.log(1)
      //     wx.showToast({
      //       title: res.success,
      //     })
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

      //   } else {
      //     console.log(2)
      //     if (res.data.error_nums < '5') {
      //       // wx.showToast({
      //       //   title: res.message,
      // icon: 'none'
      //       // })
      //       this.setData({
      //         isShowModal: true,
      //         errmsg: res.msg
      //       })
      //     } else if (res.data.error_nums == '5')
      //       this.setData({
      //         isShowModal: true,
      //         errmsg: res.msg
      //       })
      //   }
      // })
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})