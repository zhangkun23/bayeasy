// pages/invoice/billingRecord/index/index.js
const imgpath = getApp().globalData.imgPath;
const {
  getInvoiceRecord,
  showInvoiceImage,
  // downloadEmail,
} = require('../../../../http/api/api_szpj');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dropdown: imgpath + 'report/dropdown_icon.png',
    loginSelect: imgpath + 'login/loginSelect.png',
    loginUnSelect: imgpath + 'login/loginUnSelect.png',
    empty_bg_url: imgpath + 'public/emptyBackGround.png',
    info_max: imgpath + "public/info_max.png",
    isShowList: false,
    date: "",
    startTime: "2022-01",
    endTime: "",
    checkedMonth: "",
    billingRecordList: [],
    imgArr: [],
    imgPath: 'https://cs.bayeasy.cn/betaApi',
  },


  // 收入开票记录列表
  getInvoiceRecord() {
    let id = 0;
    let imgArr = [];
    let params = {
      time: this.data.checkedMonth,
      page_size: 10
    }
    let token = wx.getStorageSync('token');
    getInvoiceRecord(params).then(res => {
      console.log(res)
      if (res.ret) {
        res.data.list.map((item,index) => {
          item.index = index;
          item.checked = false;
          item.list.map(aItem => {
            aItem.src = this.data.imgPath + '/invoice/show_invoice_image?id=' + aItem.id + '&token=' + token;
            aItem.checkedItem = false;
          })
        })
        this.setData({
          billingRecordList: res.data.list
        })
      }
    })

  },
  checkedAllItem(row) {
    this.data.billingRecordList.map(item => {
      // if()
    })
  },
  // 选中子项
  changeItemChecked(event) {
    let status = event.currentTarget.dataset.row;
    status.checkedItem = true;
      console.log(event)
  },
  addZero(num) {
    return num < 10 ? '0' + num : num
  },

  getDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;

    this.setData({
      endTime: year + '-' + this.addZero(month),
      checkedMonth: year + '-' + this.addZero(month),
    })
  },
  // 选择时间
  bindDateChange(event) {
    console.log(event);
    this.setData({
      checkedMonth: event.detail.value,
    })
    console.log(this.data.checkedMonth)
  },

  checkedAll() {
    console.log(213)
    this.data.billingRecordList.map(item => {
      item.checked = true;
      item.list.map(aItem => {
        aItem.checkedItem = true;
      })
    })
  },
  previewImg: function (e) {
    const src = e.currentTarget.dataset.src;
    console.log(e)
    wx.previewImage({
      urls: [src],
    })
  },

  gotoDownloadEmail() {
    console.log('下载电子发票文件');
  },

  checkAll() {
    console.log('全选');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getInvoiceRecord();
    this.getDate();
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