// pages/tax/certificate/certificate.js
const tempPath = getApp().globalData.imgPath;
const {
  getVoucher
} = require('../../../http/api/api_csbl')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info_max: tempPath + "public/info_max.png",
    ids: 0,
    title: '',
    returnType: '',
    imgActiveUrl: "",
    imgArr: [],
    imgPreviewRotationShow: false
  },
  previewImg(event) {
    let src = event.currentTarget.dataset.src;
    // wx.previewImage({
    //   current: src,
    //   urls: this.data.imgArr
    // })
    this.setData({
      imgActiveUrl: src,
      imgPreviewRotationShow: true,
    })
  },
  closeImgPreviewRotation(){
    this.setData({
      imgPreviewRotationShow: false
    })
  },

  // 获取凭证记录
  getVoucherImg() {
    getVoucher(this.data.ids).then(res => {
      if (res.ret) {
        this.setData({
          imgArr: res.data
        })
      }
    })
  },
  renderPage(value) {
    if (value == 'delinquentBill') {
      this.setData({
        title: '欠款凭证'
      })
    } else if (value == 'repaymentBill') {
      this.setData({
        title: '还款凭证'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ids: options.id,
      returnType: options.type
    })
    this.renderPage(options.type);
    this.getVoucherImg();
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