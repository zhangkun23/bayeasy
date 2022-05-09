// pages/classroom/index.js
const tempPath = getApp().globalData.imgPath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    left_white: tempPath + 'index/left_white.png',
    left_orange: tempPath + 'index/left_orange.png',
    right_white: tempPath + 'index/right_white.png',
    right_orange: tempPath + 'index/right_orange.png',
    imageArr: [{
        img: tempPath + 'index/xkt1.png'
      },
      {
        img: tempPath + 'index/xkt2.png'
      },
      {
        img: tempPath + 'index/xkt3.png'
      },
      {
        img: tempPath + 'index/xkt4.png'
      },
      {
        img: tempPath + 'index/xkt5.png'
      },
    ],
    currentNum: 0,
    isRight: false,
    isLeft: false,
  },
  changeImage(e) {
    const value = e.detail.current
    // console.log(e)
    this.setData({
      currentNum: value
    })
  },
  changeLeft() {
    if (this.data.currentNum == 0) {
      this.data.currentNum = this.data.imageArr.length;
    }
    let num = this.data.currentNum - 1;
    console.log('数字减1', num);
    if (num <= 0) {
      this.setData({
        currentNum: this.data.imageArr.length
      })
      // num - 1;
      console.log('num= 0')
      num = this.data.imageArr.length;
    } else if (num == this.data.imageArr.length) {
      console.log('ppp')
      num = 0
    }
    this.setData({
      currentNum: num
    })
  },

  changeRight() {
    let num = this.data.currentNum + 1;
    if (num < this.data.imageArr.length) {
      console.log(111)
      num + 1;
    } else if (num == this.data.imageArr.length) {
      console.log(222)
      num = 0
    }
    console.log('数字加1', num, )
    // num = newNum
    this.setData({
      currentNum: num
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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