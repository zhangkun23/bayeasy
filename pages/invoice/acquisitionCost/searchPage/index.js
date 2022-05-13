// pages/invoice/acquisitionCost/searchPage/index.js
const app = getApp()
const {
  searchBill
} = require('../../../../http/api/api_szpj')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventChannel: null,
    // billFilter: null,
    searchKey: '',
    lastSearchKey: '',
    searchFocus: false,
    emptyPic: app.globalData.emptyPic,
    invoiceIcon: app.globalData.imgPath + 'invoice/acquisitionCost/invoiceIcon.png',
    page: 0,
    pageSize: 10,
    isSearchActive: true,
    searchResult: null,
    enablePullDown: true,
    enableShowToast: true,
    showEmpty: false,
    showSearchResult: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    // 激活搜索框
    // 不进行历史搜索
    // let history = this.getHistory()
    // const searchKey = history[0] || ''
    const searchKey = ''
    this.setData({
      searchFocus: true,
      lastSearchKey: searchKey
    })
  },
  getHistory: function () {
    // 获取搜索历史
    let history = wx.getStorageSync('invoiceSearchHistory') || []
    this.setData({
      history: history
    })
    return history
  },
  handleSearchKey: function (event) {
    // 可以在这里进行搜索关键字长度、内容的处理
    this.setData({
      searchKey: event.detail
    })
  },
  setHistory(k) {
    // 将搜索关键字存入storage 最多存10个
    // 顺序为先进先出 index越小越新
    let history = wx.getStorageSync('invoiceSearchHistory') || []
    let _history = history.slice(0, 9)
    _history.unshift(k)
    this.setData({
      history: _history
    })
    wx.setStorageSync('invoiceSearchHistory', _history)
  },
  btnGoSearch: function () {
    // 点击搜索框搜索按钮 无事件 从data中获取搜索关键字
    this.goSearch()
  },
  handleBackArrow: function () {
    const pages = getCurrentPages()
    if (pages[pages.length - 2].__route__ === "pages/invoice/acquisitionCost/filterResult/index") {
      wx.navigateBack({
        delta: 2,
      })
    } else {
      wx.navigateBack({
        delta: 1,
      })
    }
  },
  showSearch: function () {
    // 点击搜索框
    this.setData({
      isSearchActive: true,
      showSearchResult: false
    })
  },
  goSearch: function (event) {
    var that = this;

    // 获取搜索关键字
    let key;
    // 按键盘上的回车 
    if (event && event.type === 'gosearch' && event.detail) {
      this.setData({
        searchKey: event.detail
      })
      key = event.detail
    } else { // 直接点击搜索 无事件
      key = this.data.searchKey
    }
    // 没有搜索关键字 且 没有搜索记录直接点了搜索，如果是筛选页跳转的，返回无状态列表页，否则返回
    // 如果关键字为空 且 历史为空： 弹toast处理
    if (!key && !this.data.lastSearchKey) {
      wx.showToast({
        title: '请输入关键字',
        icon: 'none'
      })
      // const pages = getCurrentPages()
      // if (pages[pages.length - 2].__route__ === "pages/invoice/acquisitionCost/filterResult/index") {
      //   wx.navigateBack({
      //     delta: 2,
      //   })
      // } else {
      //   wx.navigateBack({
      //     delta: 1,
      //   })
      // }
    }
    // 如果关键字为空 且 历史不为空
    // 历史需要在onshow 赋值到 lastSearchKey
    else if (!key && this.data.lastSearchKey) { // 按照最后一次搜索关键字进行搜索
      key = that.data.lastSearchKey
      this.setData({
        searchKey: key,
        isSearchActive: false,
        showSearchResult: true
      })
      this.requestSearch(key)
      // 旧版逻辑
      // wx.navigateTo({
      //     url: '../searchResult/index',
      //     success: function (res) {
      //         res.eventChannel.emit('passSearchKey', {
      //             key: that.data.lastSearchKey
      //         })
      //     }
      // })
    }
    // 有关键字 进行搜索
    else {
      this.setData({
        searchKey: key,
        isSearchActive: false,
        showSearchResult: true
      })
      this.setHistory(key)
      this.requestSearch(key)
      // wx.navigateTo({
      //     url: '../searchResult/index',
      //     success: function (res) {
      //         res.eventChannel.emit('passSearchKey', {
      //             key: that.data.searchKey
      //         })
      //     }
      // })
    }

  },
  requestSearch: function (key = "") {
    var that = this;
    key = key || this.data.searchKey
    // 后端页面从1开始
    const onloadParams = {
      page: this.data.page + 1,
      page_size: this.data.pageSize,
      search_key: key,
    }
    searchBill(onloadParams).then(res => {
      if (res.ret) {
        if (this.data.page === 0) {
          if (res.data.total === 0) {
            this.setData({
              showEmpty: true
            })
            return
          }
        }
        if (!res.data.list.length) {
          that.setData({
            enablePullDown: false,
          })
        } else {
          res.data.list.forEach(e => {
            Object.keys(e).forEach(function (key) {
              if (e[key] === null) {
                e[key] = ''
              }
            })
          })
          that.setData({
            page: that.data.page + 1,
            searchResult: res.data.list
          })
        }
      } else {
        console.log("无法获取后台数据: ", res)
        wx.showToast({
          title: '网络有问题哦！请稍后再试试！',
          icon: 'none',
        })
      }
    }).catch(e => {
      console.error("获取列表出错: ", e)
    })
  },
  goDetail: function (e) {
    const vid = e.currentTarget.dataset.vid
    wx.navigateTo({
      url: '../invoiceDetails/index?id=' + vid,
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onScrollVReachBottom: function () {
    if (this.data.enablePullDown && !this.data.showEmpty) {
      this.requestSearch()
    } else {
      if (this.data.enableShowToast) {
        wx.showToast({
          title: '没有更多啦',
          icon: 'none',
          duration: 3000
        })
        this.setData({
          enableShowToast: false
        })
      }
    }
  },
})