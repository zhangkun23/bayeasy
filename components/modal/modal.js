// components/modal/modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "温馨提示"
    },
    contents: {
      type: Array,
      value: ["为便于贝易资为您提供更为完善的服务", "需您先登录贝易资并完成身份信息安全校验"]
    },
    showModal: {
      type: Boolean,
      value: false
    }
  },
  pageLifetimes: {
    attached() {
      console.debug("modal attached")
    }
  },
  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    closeModal() {
      console.debug("modal close btn tap");
      this.setData({ showModal: false })
      this.triggerEvent('closeBtn')
    }
  }
})