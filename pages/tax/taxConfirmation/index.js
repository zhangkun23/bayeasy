// pages/tax/taxConfirmation/index.js

const tempPath = getApp().globalData.imgPath;
const {
  declareList
} = require("../../../http/api/api_csbl")
Component({

  /**
   * 页面的初始数据
   */
  data: {
    isShowList: false,
    listIcon: tempPath + 'tax/taxreturn/list.png',
    info_max: tempPath + "public/info_max.png",
    month: '2022-03',
    supplemented: '￥234.00',
    withdrawn: '￥234.00',
    empty_bg_url: tempPath + 'public/emptyBackGround.png',
    allDeclareList: [],
  },

  lifetimes: {
    attached() {
      this.getTaxList();
    }
  },
  methods: {
    getTaxList() {
      let params = {
        status: 3,
        page_size: 15,
        year: ''
      }
      declareList(params).then(res => {
        if (res.ret) {
          this.setData({
            allDeclareList: res.data.list
          })
        }
        console.log(res, '列表')
      })
    },
    // 跳转详情
    gotoDeatil(event) {
      let row = event.currentTarget.dataset.row
      console.log(row);
      wx.navigateTo({
        url: '../deatil/deatil?id=' + row.id,
      })
    }
  }
})