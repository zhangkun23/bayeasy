// pages/login/association/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    successIcon: app.globalData.imgPath + "public/success.png",
    agency: false
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
    let todoNmu = getApp().globalData.todolistNum;
    if (todoNmu > 0) {
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
  },
})