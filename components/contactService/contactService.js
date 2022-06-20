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
    // 判断页面是否滚动
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
    showModal: false,
    showActionsheet: false,
  },

  // 监听页面滚动 
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
  
  attached() {
    console.log(this.data.type)
    this.getOperateList()
  },


  /**
   * 组件的方法列表
   */
  methods: {
    // 弹窗内
    btnClick(e) {
      if (e.detail.value == 1) {
        wx.makePhoneCall({
          phoneNumber: getApp().globalData.phoneNumber
        })
      } else {
        this.toContact()
      }
    },
    toContact() {},

    // 联系客服
    contactService() {
      // if (!this.data.suspend) {
      //   this.setData({
      //     suspend: false
      //   })
      // } else {
      //   this.setData({
      //     suspend: true
      //   })
      // }
      console.log(this.data.type)
      let item = this.data.serviceList.filter(item => {
        return item.type == this.data.type
      })
      console.log(item)
      if (this.data.type == 'financialOperations' || this.data.type == 'billingSpecialist') {
        wx.navigateTo({
          url: '/pages/contactOperate/index?label_name=' + item.label_name + '&img=' + item.wechat_img,
        })
        // this.setData({
        //   showModal: true
        // })
      } else {
        // wx.navigateTo({
        //   url: '/pages/contactOperate/index?label_name=' + item.label_name + '&img=' + item.wechat_img,
        // })
        this.setData({
          showModal: true
        })
      }
    },

    // 获取运营人员列表
    getOperateList() {
      operateList().then(res => {
        if (res.ret) {
          let data = res.data;
          data.map(item => {
            if (item.label_name == '财务运营') {
              item.type = 'financialOperations'
            } else if (item.label_name == '开票运营') {
              item.type = 'billingSpecialist'
            } else if (item.label_name == '商务运营') {
              item.type = 'businessOperation'
            }
          })
          this.setData({
            serviceList: data
          })
          console.log(data)
        }
      })
    },


  }
})