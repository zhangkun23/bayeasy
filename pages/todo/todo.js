// pages/todo/todo.js
const {
  todolist
} = require('../../http/api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    empty_bg_url: 'https://image.bayeasy.cn/images-data/public/emptyBackGround.png',
    config: {
      canvasSize: {
        width: 196 * 2,
        height: 196 * 2
      },
      percent: 100,
      barStyle: [{
        width: 60,
        fillStyle: '#e7edf6',
        lineCap: 'round'
      }, {
        width: 60,
        animate: true,
        fillStyle: [{
          position: 0,
          color: '#5f9afc'
        }, {
          position: 1,
          color: '#5f9afc'
        }]
      }]
    },
    todo_lists: [{
        id: 1,
        isShow: false,
        titleYellow: true,
        title: "征期申报税款确认",
        subTitle: "请您尽快确认税额，以免影响申报进度",
        btnText: "去确认"
      },
      {
        id: 2,
        isShow: false,
        titleYellow: true,
        title: "征期申报税款确认",
        subTitle: "征期已将近，请尽快确认",
        btnText: "去确认"
      },
      {
        id: 3,
        isShow: false,
        titleYellow: true,
        count: 0,
        title: "您有3条申报欠款记录需要处理",
        subTitle: "为了不影响公司信誉，请尽快结清欠款",
        btnText: "去查看"
      },
      {
        id: 4,
        isShow: false,
        titleYellow: true,
        title: "账单发票信息确认",
        subTitle: "请尽快确认账单发票信息",
        btnText: "去确认"
      },
      {
        id: 5,
        isShow: false,
        titleYellow: false,
        count: 0,
        title: "您有3条申报欠款已结清",
        subTitle: "请尽快查看核实信息是否有误",
        btnText: "去查看"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    todolist().then(res => {
      if (res.ret) {
        if (res.data instanceof Object) {
          const _data = res.data
          const _todo_keys = Object.keys(_data)
          const _new_todo_lists = this.data.todo_lists
          if (_todo_keys.includes("invoice") && _data.invoice.length > 0) {
            _new_todo_lists[3].isShow = true
          }
          if (_todo_keys.includes("declare") && _data.declare.length > 0) {
            _new_todo_lists[0].isShow = true
          }
          if (_todo_keys.includes("overdue_declare") && _data.overdue_declare.length > 0) {
            _new_todo_lists[1].isShow = true
          }
          if (_todo_keys.includes("loan") && _data.loan.length > 0) {
            _new_todo_lists[2].isShow = true
            _new_todo_lists[2].count = _data.loadn_nums
          }
          if (_todo_keys.includes("repayment") && _data.repayment.length > 0) {
            _new_todo_lists[4].isShow = true
            _new_todo_lists[4].count = _data.repayment_nums
          }
          this.setData({
            todo_lists: _new_todo_lists,
            count: _data.nums
          })
        }
      }
    })
    if (this.data.count !== 0) {
      this.setData({
        background_img: 'https://image.bayeasy.cn/images-data/public/backGround.png'
      })
    }
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
    console.debug('onPullDownRefresh')
    this.setData({
      count: 0
    })
    wx.stopPullDownRefresh();

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