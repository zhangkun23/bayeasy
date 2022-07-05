// pages/tax/payRecordDetails/payRecordDetails.js
const tempPath = getApp().globalData.imgPath;
const {
  declareInfo
} = require('../../../http/api/api_csbl');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listIcon: tempPath + 'tax/taxreturn/list.png',
    info_max: tempPath + "public/info_max.png",
    deatilObj: {},
    repaymentBillId: 0,
    detailList: [], // 明细列表
    taxList: [], // 税种列表
    isShowModal: false,
    showBtn: false,
    didClick: true,
    showTaxList: false,
    returnType: '',
    color: '',
    background: '',
    currentOptionIndex: 0
  },
  // 返回
  backIndex() {
    // wx.reLaunch({
    //   url: '../paymentRecord/index',
    // })
  },
  closeList() {
    this.setData({
      showTaxList: false
    })
  },
  addTaxItem() {
    this.setData({
      showTaxList: true
    })
  },
  hideTips() {
    this.setData({
      showTips: false
    })
  },
  // 选中当前项
  checkedItemParent(event) {
    // console.log(event)
    let row = event.currentTarget.dataset.item
    let temp = this.data.taxList;
    this.setData({
      taxList: temp.map(item => {
        if (item.index == row.index) {
          item.checked = true
        } else {
          item.checked = false
        }
        return item;
      })
    })
    this.updateItemInfo(row.tax_category);
  },
  updateItemInfo(name) {
    this.data.listAll.map(item => {
      if (item.name == name) {
        this.setData({
          detailList: item.list
        })
      }
    })
  },
  // 组件更新item状态和数据
  updateList(value) {
    // 
    // console.log("!", value)
    this.setData({
      taxList: value,
      showTaxList: false
    })
    value.map(item => {
      if (item.checked) this.updateItemInfo(item.tax_category);
    })
  },
  showToast() {
    this.setData({
      showTips: true
    })
  },
  // 获取详情
  getdeclareInfo() {
    declareInfo(this.data.repaymentBillId).then(res => {
      if (res.ret) {
        let arr = []
        if (res.data.list.length > 0) {
          arr = res.data.list
          this.setData({
            listAll: arr,
            detailList: arr[0].list,
          })
        }
        if (res.data.category.length > 0) {
          res.data.category.map((item, i) => {
            item.checked = false;
            item.index = i
            item.iid = "option_"+i
          })
          res.data.category[0].checked = true;
        }
        this.setData({
          deatilObj: res.data,
          taxList: res.data.category
        })
      } else {
        wx.showToast({
          title: '接口请求失败',
        })
      }
    })
  },
  renderPage(value) {
    if (value == 'list') {
      this.setData({
        title: '本期申报税款确认',
        returnType: value
      })
    } else if (value == 'result') {
      this.setData({
        title: '申报税款确认记录',
        returnType: value
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      repaymentBillId: options.id
    })
    this.renderPage(options.type)
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getdeclareInfo();

  },
  bindPickerChange: function(e){
      // console.log(e.detail.value)
      const _index = e.detail.value
      let _list = this.data.taxList
      _list.map(i=>{
        if(i.index == _index){
          i.checked = true
        }else{
          i.checked = false
        }
      })
      _list[_index].checked = true
      // 更改
      this.updateList(_list)
      this.setData({
        currentOptionIndex: "option_"+_index
      })
  }
})