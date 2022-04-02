// pages/todo/todo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 3,
    empty_bg_url: 'https://image.bayeasy.cn/images-data/public/emptyBackGround.png',
    config: {
      canvasSize: {
        width: 196*2,
        height: 196*2
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
    todo_lists: [
      {
        titleYellow: true,
        title: "征期申报税款确认",
        subTitle:"请您尽快确认税额，以免影响申报进度",
        btnText: "去确认"
      },
      {
        titleYellow: true,
        title: "征期申报税款确认",
        subTitle:"请您尽快确认税额，以免影响申报进度",
        btnText: "去确认"
      },
      {
        titleYellow: true,
        title: "征期申报税款确认",
        subTitle:"请您尽快确认税额，以免影响申报进度",
        btnText: "去确认"
      },
      {
        titleYellow: true,
        title: "征期申报税款确认",
        subTitle:"请您尽快确认税额，以免影响申报进度",
        btnText: "去确认"
      },
      {
        titleYellow: false,
        title: "征期申报税款确认",
        subTitle:"请您尽快确认税额，以免影响申报进度",
        btnText: "去确认"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(this.data.count !== 0){
      this.setData({background_img: 'https://image.bayeasy.cn/images-data/public/backGround.png'})
    }
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
      if(this.data.count !== 0){
        this.setData({background_img: 'https://image.bayeasy.cn/images-data/public/backGround.png'})
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