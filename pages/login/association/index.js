// pages/login/association/index.js
const app = getApp();

const {
  todolist
} = require('../../../http/api/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    successIcon: app.globalData.imgPath + "public/done.png",
    agency: false,

  },
  todoList() {
    wx.navigateTo({
      url: '../../todo/todo',
    })
  },
  onUnload: function () {
    wx.reLaunch({
      url: '../../index/index',
    })
  },
  onShow: function (options) {
    todolist().then(res => {
      if (res.ret) {
        if (res.data.nums > 0) {
          this.setData({
            agency: true
          })
        } else {
          setTimeout(() => {
            wx.switchTab({
              url: '../../index/index',
            })
          }, 3000)
        }
        getApp().globalData.todolistNum = res.data.nums;
      }
    })
  },
})