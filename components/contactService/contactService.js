// components/contactService/contactService.js
const tempPath = getApp().globalData.imgPath;
const {
  operateList
} = require("../../http/api/api_grzx")
// const serviceStatus = getApp().globalData.serviceStatus // 页面滚动开始
let touchStatTimeout = null;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    touchStat: {
      touchStat: Boolean,
      value: getApp().globalData.touchStat,
    },
    // 固定传入type判断是
    type: {
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgSrc: tempPath + 'public/icon__figure.png',
    serviceList: [],
    suspend: false,
  },

  observers: {
    touchStat(val) {
      clearTimeout(touchStatTimeout)
      if (val) {
        this.setData({
          suspend: true,
        })
      } else {
        touchStatTimeout = setTimeout(() => {
          this.setData({
            suspend: false,
          })
        }, 2000)
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // l联系客服
    contactService() {
      let item = this.data.serviceList.filter(item => {
        return item.type == this.data.type
      })
      console.log(item)
      if (this.data.type == 'financialOperations' || this.data.type == 'billingSpecialist') {
        wx.navigateTo({
          url: '/pages/contactOperate/index',
        })
      } else {

      }
      console.log('页面改变')
    },

    // 获取运营人员列表
    getOperateList() {
      operateList().then(res => {
        console.log(res)
        if (res.ret) {
          let data = res.data;
          data.map(item => {
            if (item.label_name == '财务运营') {
              data[0].type = 'financialOperations'
            } else if (item.label_name == '开票专员') {
              item.type = 'billingSpecialist'
            } else if (item.label_name == '商务运营') {
              item.type = 'businessOperation'
            }
          })
          console.log(data)
          this.setData({
            serviceList: data
          })
        }
      })
    },
  }
})