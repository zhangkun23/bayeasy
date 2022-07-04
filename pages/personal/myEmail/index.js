// pages/personal/myEmail/index.js
const tempPath = getApp().globalData.imgPath;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    email: tempPath + "tax/businessAnnual/email_icon.png",
    inputClose: tempPath + "public/inputClose.png",
    inputValue: "",
    color: "#E6EEF7",
    isShowIcon: false,
    isValid: false,
    btnBackgroundColor: "#E6EEF7",
    btnColor: "#ABBED2",
    globalEmail: getApp().globalData.email,
    isShowUpdateEmail: false,
  },
  onInput(e) {
    let value = e.detail.value;
    if (value) {
      this.setData({
        color: "#1D83F0",
      });
    }
    this.setData({
      isShowIcon: true,
      inputValue: value,
    });
  },
  onFocus() {
    this.setData({
      isShowIcon: true,
      isValid: false,
      color: "#1D83F0",
    });
  },
  onBlur(e) {
    let value = e.detail.value;
    if (!value) {
      this.setData({
        color: "#E6EEF7",
        isValid: false,
      });
    } else {
      this.verifyEmail(value);
    }
    this.setData({
      isShowIcon: false,
    });
  },
  // 删除事件
  clearInputValue() {
    this.setData({
      inputValue: "",
      isValid: false,
      color: "#E6EEF7",
      btnBackgroundColor: "#E6EEF7",
      btnColor: "#ABBED2",
    });
  },
  // 验证邮箱
  verifyEmail(value) {
    let reg = new RegExp(
      "^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$"
    );
    if (reg.test(value)) {
      this.setData({
        isValid: false,
        btnBackgroundColor: "#1D83F0",
        btnColor: "#fff",
      });
    } else {
      this.setData({
        isValid: true,
        color: "#FF475A",
      });
    }
  },

  updateEmail() {
    let val = this.data.inputValue;
    update(val).then((res) => {
      if (res.ret) {
        wx.setStorageSync('email', val)
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let email = wx.getStorageSync('email');
    if (email) {
      this.setData({
        inputValue: email
      })
    } else {
      this.setData({
        inputValue: ''
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});