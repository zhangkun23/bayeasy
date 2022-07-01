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
    // this.contactService()
    console.log(getApp().globalData.currentOperationStatus)
    console.log(getApp().globalData.showServiceModal)
  },


  /**
   * 组件的方法列表
   */
  methods: {

    getItemObj() {
      let currentOperation = getApp().globalData.currentOperation;
      if (currentOperation && currentOperation.length > 0) {
        let items = currentOperation.filter(item => {
          return this.data.type == item.type
        })[0];
        wx.navigateTo({
          url: '/pages/contactOperate/index?label_name=' + items.label_name
        })
      } else {
        this.setData({
          showModal: true
        })
      }
    },

    // 联系客服
    contactService() {
      operateList().then(res => {
        if (res.ret) {
          if (res.data && res.data.length > 0) {
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
            let items = data.filter(item => {
              return this.data.type == item.type
            })[0];
            if (items) {
              if (this.data.type == 'financialOperations' || this.data.type == 'billingSpecialist' || this.data.type == 'businessOperation') {
                wx.navigateTo({
                  url: '/pages/contactOperate/index?label_name=' + items.label_name + '&wechat_img=' + items.wechat_img,
                })
              } else {
                this.setData({
                  showModal: true
                })
              }
            } else {
              this.setData({
                showModal: true
              })
            }
          } else {
            this.setData({
              showModal: true
            })
          }
        }
      })
    },
  }
})