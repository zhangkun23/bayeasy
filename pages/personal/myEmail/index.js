// pages/personal/myEmail/index.js
const tempPath = getApp().globalData.imgPath;
const {
  resetEmail
} = require('../../../http/api/api')
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
    isShowUpdateEmail: false,
    disabled: false,
  },
  onInput(e) {
    let value = e.detail.value;
    if (value) {
      this.setData({
        color: "#1D83F0",
        btnBackgroundColor: "#1D83F0",
        btnColor: "#fff"
      });
    } else {
      this.setData({
        inputValue: "",
        isValid: false,
        color: "#E6EEF7",
        btnBackgroundColor: "#E6EEF7",
        btnColor: "#ABBED2",
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
    console.log(e)
    let value = e.detail.value;
    if (!value) {
      this.setData({
        color: "#E6EEF7",
        isValid: false,
      });
    } else {
      this.setData({
        isShowUpdateEmail: false,
        resStart: e.detail.cursor
      })
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
  // 修改邮箱
  updateEmail(e) {
    this.setData({
      disabled: false,
      color: '#1D83F0',
      isShowUpdateEmail: false,
      btnBackgroundColor: "#1D83F0",
      btnColor: "#fff",
      isShowIcon: true
    })
  },
  // 保存邮箱
  sureEmail() {
    let val = this.data.inputValue;
    let reg = new RegExp(
      "^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$"
    );
    if (reg.test(val)) {
      resetEmail({
        email: val
      }).then(res => {
        if (res.ret) {
          getApp().globalData.email = res.data.email;
          this.setData({
            isShowUpdateEmail: true,
            disabled: true,
            color: "#E6EEF7",
          })
        } else {
          wx.showToast({
            title: res.message,
            icon: "none"
          })
        }
      })
    } else {
      this.setData({
        isValid: true,
        color: "#FF475A",
      });
    }
  },

  // 初始化邮箱
  initVal() {
    let globalEmail = getApp().globalData.email;
    if (globalEmail) {
      this.setData({
        inputValue: globalEmail,
        color: "#E6EEF7",
        isShowUpdateEmail: true,
        disabled: true
      })
    } else {
      this.setData({
        inputValue: "",
        isValid: false,
        color: "#E6EEF7",
        btnBackgroundColor: "#E6EEF7",
        btnColor: "#ABBED2",

      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initVal()
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