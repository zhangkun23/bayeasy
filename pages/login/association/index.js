// pages/login/association/index.js
Component({

  /**
   * 页面的初始数据
   */
  data: {
    agency: false
  },
  methods: {
    todoList() {
      wx.navigateTo({
        url: '../../todo/todo',
      })
    }
  },
  lifetimes: {
    attached() {
      if (getApp().globalData.todolistNum > 0) {
        this.setData({
          agency: true
        })
      }
    }
  },
})