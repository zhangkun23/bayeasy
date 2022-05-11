Component({
  data: {
    isShow: true,
    selected: 2,
    color: "#ABBED2",
    selectedColor: "#1D83F0",
    footerBg: getApp().globalData.imgPath + 'footer/footerBg.png',
    footerIndex: getApp().globalData.imgPath + 'footer/footer_index1.png',
    list: [{
      pagePath: "/pages/service/index",
      text: "服务介绍",
      iconPath: getApp().globalData.imgPath + 'footer/footer0.png',
      selectedIconPath: getApp().globalData.imgPath + 'footer/footer0_click.png',
    }, {
      pagePath: "/pages/invoice/invoiceIndex/index",
      text: "收支票据",
      iconPath: getApp().globalData.imgPath + 'footer/footer2.png',
      selectedIconPath: getApp().globalData.imgPath + 'footer/footer2_click.png',
    }, {
      pagePath: "/pages/index/index",
      text: "",
      iconPath: '',
      selectedIconPath: '',
    }, {
      pagePath: "/pages/tax/taxIndex/index",
      text: "财税办理",
      iconPath: getApp().globalData.imgPath + 'footer/footer3.png',
      selectedIconPath: getApp().globalData.imgPath + 'footer/footer3_click.png',
    }, {
      pagePath: "/pages/personal/personalIndex/index",
      text: "个人中心",
      iconPath: getApp().globalData.imgPath + 'footer/footer4.png',
      selectedIconPath: getApp().globalData.imgPath + 'footer/footer4_click.png',
    }]
  },
  attached() {},
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        activeIdx: 0
      })
    }
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      this.setData({
        selected: data.index
      })
      wx.switchTab({
        url: url
      })
      this.setData({
        selected: data.index
      })
    }
  }
})