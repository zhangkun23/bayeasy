// pages/login/information/index.js
const {
  IdCardOCR
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
      validUntil: ''
    },
    showIdcardFront: true,
    showIdcardResever: true,
    showClose: false,
    buttons: [{
      text: '我知道了'
    }],
    front: "拍摄身份证正面",
    resever: "拍摄身份证反面",
    frontImg: "https://image.bayeasy.cn/images-data/authentication/idcard_ front.png",
    reseverImg: "https://image.bayeasy.cn/images-data/authentication/idcard_ front.png"
  },

  methods: {
    confirmSubmit() {
      this.setData({
        isShowModal: true
      })
    },
    // 上传图片
    uploadIdcard(e) {
      const params = e.currentTarget.dataset;
      console.log(params)
      let that = this;
      wx.showActionSheet({
        itemList: ["从相册中选择", "拍照"],
        success: function (e) {
          console.log(e)
          //album:相册 返回0  //camera拍照   返回1  
          e.cancel || (0 == e.tapIndex ? that.chooseWxImageShop("album") : 1 == e.tapIndex && that.chooseWxImageShop("camera"));
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      });
    },
    chooseWxImageShop: function (a) {
      console.log(a)
      var e = this;
      console.log(a)
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: [a],
        success: function (res) {
          console.log(res.tempFiles)
          if (res.tempFiles[0]) {
            const imgPath = res.tempFiles[0].tempFilePath
            wx.uploadFile({
              url: 'http://gsh.dev.corp.bayeasy.cn:11880/gshApi/personal_nformation/ocr_idcard',
              header: {
                'access_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90ZXN0LmdzaC5jb21cL2dzaEFwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2NDkyMTU5NzAsImV4cCI6MTY1NTIxNTk3MCwibmJmIjoxNjQ5MjE1OTcwLCJqdGkiOiJZcjFTcmdlUmFwYXlSV3VzIiwic3ViIjoxMiwicHJ2IjoiMDVkOTI0MWU2MzIzY2UzZTA5ZWM2MDFlOGNjNWEwNzhlNDg0ZjQ1MiJ9.RTNVccoegm36Owl5SJOBftLppecOwDVdM2YS-K9wSmw',
              },
              filePath: imgPath,
              name: 'name',
              success: function (res) {
                console.log(res, '成功')
                // const data = Json.parse(res.data)
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
                success: function (a) {
                  a.confirm;
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
      // wx.switchTab({
      //   url: '/pages/index/index',
      // })
    }
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