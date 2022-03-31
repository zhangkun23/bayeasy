// pages/personal/components/gates-btn/gates-btn.ts
Component({
  options: {
    styleIsolation: 'isolated'
  },
  lifetimes: {
    show: function() {
      console.debug("btn showed, properties" ,this.properties)
    },
    attached: function() {
    }

  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    iconUrl: String,
    gateWidth: {
      type: String,
      value: '20rpx'
    },
    gateHeight: {
      type: String,
      value: '20rpx'
    },
    fontSize: {
      type: String,
      value: '24rpx'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
