// pages/tax/taxConfirmation/index.js

const tempPath = getApp().globalData.imgPath;
const {
  declareList
} = require("../../../http/api/api_csbl")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowList: false,
    showPage: false,
    listIcon: tempPath + 'tax/taxreturn/list.png',
    info_max: tempPath + "public/info_max.png",
    month: '2022-03',
    supplemented: '￥234.00',
    withdrawn: '￥234.00',
    empty_bg_url: tempPath + 'public/emptyBackGround.png',
    allDeclareList: [],
    title: '',
    returnType: '',
    page: 0,
    page_size: getApp().globalData.page_size,
    ids: [],
  },
  // 逻辑正确
  backTaxIndex() {
    if (this.data.returnType == 'todo') {
      wx.navigateTo({
        url: '../../todo/todo',
      })
    } else {
      // console.log('navigateBack')
      // console.log( getCurrentPages())
      // wx.navigateBack({ //返回
      //   delta: 1
      // })
      wx.navigateTo({
        url: '../taxreturn/index',
      })
    }
  },
  renderPage(value) {
    if (value == 'todo') {
      this.setData({
        title: '申报税款确认',
        returnType: value
      })
    } else if (value == 'list') {
      this.setData({
        title: '申报税款确认',
        returnType: value
      })
    }
  },
  sureRecord() {
    wx.navigateTo({
      url: '../taxRecord/index?type=list',
    })
  },

  getTaxList() {
    let params = {
      status: 1,
      year: '',
      page: this.data.page + 1,
      page_size: 1000,
    }
    wx.setStorageSync('pageStatus', 3)
    declareList(params).then(res => {
      if (res.ret) {
        let that = this;
        let idArr = [];
        let arr = that.data.allDeclareList;
        if (that.data.ids.length > 0) {
          that.data.ids.map(item => {
            res.data.list.map(key => {
              if (key.id == item) {
                idArr.push(key)
              }
            })
          });
          this.setData({
            allDeclareList: idArr,
          })
        } else {
          // let newArr = arr.concat(res.data.list)
          that.setData({
            allDeclareList: res.data.list
          })
        }
        this.setData({
          showPage: true
        })
        console.log(idArr)
        console.log(res, '列表')
      }
    })
  },
  // 跳转详情
  gotoDeatil(event) {
    let row = event.currentTarget.dataset.row
    wx.navigateTo({
      url: '../deatil/deatil?id=' + row.id + '&type=list'
    })
  },
  // reachBottom(event) {
  //   wx.showNavigationBarLoading();
  //   if (this.data.empty) {
  //     wx.showToast({
  //       title: '没有更多数据啦',
  //       icon: 'none'
  //     })
  //   }
  //   this.getTaxList()
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let ids = '26_2_3'.split('_');
    console.log(options)
    if(options.ids) {
      let ids = options.ids.split('_');
      this.setData({
        ids: ids
      })
    }
    this.renderPage(options.type)
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
    this.getTaxList();
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