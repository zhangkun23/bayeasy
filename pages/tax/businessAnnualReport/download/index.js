// pages/invoice/incomeInvoice/downloadPage/index/index.js
const tempPath = getApp().globalData.imgPath;
const {
  annualReportSendEmail
} = require('../../../../http/api/api_csbl')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info_max: tempPath + "public/info_max.png",
    email: tempPath + "invoice/billingRecord/email.png",
    inputClose: tempPath + "public/inputClose.png",
    errorIcon: tempPath + "invoice/billingRecord/checkmark_circle.png",
    back: tempPath + 'invoice/billingRecord/email_outlined.png',
    isShowIcon: false,
    isValid: false,
    inputValue: '',
    ids: [],
    downloadNum: 0,
    color: '#E6EEF7',
    currentID: 0,
  },

  onInput(e) {
    let value = e.detail.value;
    if (value) {
      this.setData({
        color: '#1D83F0'
      })
    }
    this.setData({
      isShowIcon: true,
      inputValue: value
    })
  },
  onFocus() {
    this.setData({
      isShowIcon: true,
      isValid: false,
      color: '#1D83F0'
    })
  },
  onBlur(e) {
    let value = e.detail.value;
    if (!value) {
      this.setData({
        color: '#E6EEF7'
      })
    }
    this.verifyEmail(value);
    this.setData({
      isShowIcon: false,
    })
  },
  // 删除事件
  clearInputValue() {
    this.setData({
      inputValue: '',
      isValid: false,
      color: '#E6EEF7'
    })
  },
  // 验证邮箱
  verifyEmail(value) {
    let reg = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');
    if (reg.test(value)) {
      this.setData({
        isValid: false,
      })
    } else {
      this.setData({
        isValid: true,
        color: '#FF475A'
      })
    }
  },

  // 去下载
  gotoDownload() {
    if (!this.data.inputValue) {
      wx.showToast({
        title: '请输入您的邮箱地址',
        icon: 'none'
      })
    } else {
      this.verifyEmail(this.data.inputValue);
      if (!this.data.isValid) {
        let params = {
          email: this.data.inputValue,
          id: this.data.currentId,
          file_id: this.data.ids,
        }
        annualReportSendEmail(params).then(res => {
          if (res.ret) {
            wx.navigateTo({
              url: '../sendSucc/index?type=' + this.data.type + '&currentID=' + this.data.currentID,
            })
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let email = wx.getStorageSync('email');
    if (email) {
      this.setData({
        inputValue: email,
        color: '#1D83F0',
      })
    } else {
      this.setData({
        inputValue: '',
        color: '#E6EEF7',
      })
    }
    let downloadNum = options.ids.split(',').length;
    console.log(downloadNum)
    this.setData({
      downloadNum,
      ids: options.ids,
      currentId: options.currentId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})