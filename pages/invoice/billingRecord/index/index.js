// pages/invoice/billingRecord/index/index.js
const imgpath = getApp().globalData.imgPath;
const {
  getInvoiceRecord,
  // downloadEmail,
} = require('../../../../http/api/api_szpj');
const utils = require('../../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dropdown: imgpath + 'report/dropdown_icon.png',
    loginSelect: imgpath + 'invoice/billingRecord/checked.png',
    loginUnSelect: imgpath + 'invoice/billingRecord/unchecked.png',
    empty_bg_url: imgpath + 'public/emptyBackGround.png',
    isShowList: false,
    isShowCheckedAll: false,
    date: "",
    startTime: "2022-01",
    endTime: "",
    checkedMonth: "",
    billingRecordList: [],
    imgArr: [],
    imgPath: 'https://cs.bayeasy.cn/betaApi',
  },



  // 收入开票记录列表
  getInvoiceRecord(time) {
    let params = {
      time: time,
      page_size: 10
    }
    let token = wx.getStorageSync('token');
    getInvoiceRecord(params).then(res => {
      // let arr = [];
      // console.log(res) 
      if (res.ret) {
        if (res.data.list !== null) {
          let time = res.data.list[0].time.split('至');
          let date = time[0].split('-');
          let showtime = date[0] + '-' + date[1];
          this.setData({
            checkedMonth: showtime
          })
          res.data.list.map((item, index) => {
            item.index = index;
            item.checked = false;
            item.list.map((aItem, aIndex) => {
              // arr.push(aItem)
              aItem.src = this.data.imgPath + '/invoice/show_invoice_image?id=' + aItem.id + '&token=' + token;
              aItem.checkedItem = false;
              aItem.index = aIndex;
            })
          })
        }
        // if (arr.length / 10 !== 0) {
        //   console.log(2222,arr.length / 10 !== 0)
        // }
        // console.log(arr)
        this.setData({
          billingRecordList: res.data.list
        })
      }
    })

  },
  // 选择账期时间
  checkedAllItem(event) {
    let value = event.currentTarget.dataset.row;
    let data = this.data.billingRecordList;
    data.map(item => {
      if (item.index == value.index) {
        if (item.checked) {
          item.checked = false
          item.list.map(aItem => {
            aItem.checkedItem = false;
          })
        } else {
          item.checked = true
          item.list.map(aItem => {
            aItem.checkedItem = true;
          })
        }
        // item.checked = !item.checked;
        // item.list.map(aItem => {
        //   aItem.checkedItem = !aItem.checkedItem;
        // })
      }
    })
    this.setData({
      billingRecordList: data,
    })
    this.updateAllStatus(data);
  },

  // 单选某一item时 是否设置全选
  updateAllStatus(data) {
    let tempNum = 0;
    let size = data.length;
    data.map(item => {
      if (item.checked) ++tempNum
    })
    this.setData({
      isShowCheckedAll: tempNum == size
    })
  },

  // 选中子项
  changeItemChecked(event) {
    let parent = event.currentTarget.dataset.parent;
    const parentNum = parent.list.length; // 当前父亲 list有多个

    let index = event.currentTarget.dataset.index;
    let data = this.data.billingRecordList;
    let activeNum = 0;

    // 当前父亲 list 有多个已经被选中
    data.map(item => {
      if (item.index == parent.index) {
        item.list.map(item1 => {
          if (item1.index == index) {
            item1.checkedItem = !item1.checkedItem;
          }
          if (item1.checkedItem) {
            ++activeNum
          }
        })
        activeNum == parentNum ? item.checked = true : item.checked = false;
      }
    })
    this.setData({
      billingRecordList: data,
      checkedNum: activeNum
    })
    this.updateAllStatus(data);
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
    this.getInvoiceRecord(event.detail.value)
    this.setData({
      checkedMonth: event.detail.value,
    })
  },
  // 全选
  checkedAll() {
    let data = this.data.billingRecordList;
    let status = this.data.isShowCheckedAll;
    data.map(item => {
      item.checked = !status;
      item.list.map(aItem => {
        aItem.checkedItem = !status;
      })
    })
    this.setData({
      billingRecordList: data,
      isShowCheckedAll: !status
    })
  },
  previewImg: function (e) {
    const src = e.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src],
    })
    utils.saveImgToAlbum(src)
  },
  // 长按事件开始
  // touchstart(e) {
  //   console.log(2222, e)
  //   this.setData({
  //     touchstart: e.timeStamp
  //   })
  // },
  // // 长按事件结束
  // touchend(e) {
  //   console.log(e)
  //   let src = e.currentTarget.dataset.src 
  //   this.setData({
  //     touchend: e.timeStamp
  //   })
  //   if ((this.data.touchend - this.data.touchstart) >= 2000) {
  //     /*长按两秒*/
  //     utils.saveImgToAlbum(src)      //响应事件
  //   }
  // },
  gotoDownloadEmail() {
    let arrIds = [];
    let data = this.data.billingRecordList;
    data.map(item => {
      item.list.map(item1 => {
        if (item1.checkedItem) arrIds.push(item1.id)
      })
    })

    if (arrIds.length < 1) {
      wx.showToast({
        title: '请选择要下载的发票',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../../incomeInvoice/downloadPage/index/index?ids=' + arrIds,
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getInvoiceRecord('');
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