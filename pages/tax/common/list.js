// pages/tax/common/list.js
const tempPath = getApp().globalData.imgPath;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    List: {
      type: Array,
      value: []
    },
    listShow:{
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputClose: tempPath + "public/inputClose.png",
    checkArr: [],
  },

  lifetimes:{
    attached() {
      // console.log(this.taxList)
    },
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.triggerEvent('closeList')
    },
    //  选中当前项
    checkedChildItem(event) {
      console.log(event)
      let row = event.currentTarget.dataset.item
      let temp = this.data.List;
      temp.map(item => {
        if (item.index == row.index) {
          item.checked = true
        } else {
          item.checked = false
        }
        return item;
      })
      this.triggerEvent('updateList',temp)
    },
    onMyEvent(event) {
      console.log(event)
    },
  }
})