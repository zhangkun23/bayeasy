// pages/invoice/billingRecord/index/index.js
const imgpath = getApp().globalData.imgPath;
const {
  getInvoiceRecord,
  // downloadEmail,
} = require('../../../../http/api/api_szpj');
const utils = require('../../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dropdown: imgpath + 'report/dropdown_icon.png',
    loginSelect: imgpath + 'invoice/billingRecord/checked.png',
    loginUnSelect: imgpath + 'invoice/billingRecord/unchecked.png',
    empty_bg_url: imgpath + 'public/emptyBackGround.png',
    isShowList: false,
    isShowCheckedAll: false,
    date: "",
    startTime: "2022-01",
    endTime: "",
    checkedMonth: "",
    billingRecordList: [],
    imgArr: [],
    imgPath: 'https://cs.bayeasy.cn/betaApi',
    page_size:2,//每页展示的条数
	  current_page: 1,//当前页数
	  total:2//总页数
  },

  /**
   * 选中当前项目
   * 1 每一项都选中 全选要勾选
   * 2 每一项都没有选中 全选要取消
   * 3 勾选活取消当前项目
   * @param {*} event 
   */
  handelClick(event){
    let item = event.currentTarget.dataset.item;
    let index = event.currentTarget.dataset.index; 
    item.checked = !item.checked;
    let active =  this.data.billingRecordList;
    active[index] = item;
    
    let num = 0;
    let allStatus = false;
    active.map(item=> {
      if(item.checked) num++
    })
    // 所有都没有选中
    if(num == active.length) {
      allStatus = true
    }else{
      allStatus = false
    }
    this.setData({
      billingRecordList:active,
      isShowCheckedAll:allStatus
    })

  },

  // 收入开票记录列表
  getInvoiceRecord(time) {
    let params = {
      time: time,
      page_size: this.data.page_size,
      page:this.data.current_page
    }
    let token = wx.getStorageSync('token');
    getInvoiceRecord(params).then(res => {
      if (res.ret && res.data.list.length ) {
          let info = res.data.list;
          let time = info[0].time.split('至');
          let date = time[0].split('-');
          let showtime = date[0] + '-' + date[1];
          info.map((item, index) => {
            item.src = this.data.imgPath + '/invoice/show_invoice_image?id=' + item.id + '&token=' + token;
            item.checkedItem = false;
          })
          // 分页需要知道是否勾选全选
          const list = this.data.billingRecordList.concat(info);
          if(this.data.isShowCheckedAll){
            list.map(item => {
              return item.checked = true
            })
          }
          this.setData({
            checkedMonth: showtime,
            billingRecordList: list,
            current_page:this.data.current_page,
            total:res.data.total/this.data.page_size
          })
      }else{
        this.setData({
          billingRecordList: []
        })
      }
    })

  },
  // 选择账期时间 ---放弃
  checkedAllItem(event) {
    let value = event.currentTarget.dataset.row;
    let data = this.data.billingRecordList;
    data.map(item => {
      if (item.index == value.index) {
        if (item.checked) {
          item.checked = false
          item.list.map(aItem => {
            aItem.checkedItem = false;
          })
        } else {
          item.checked = true
          item.list.map(aItem => {
            aItem.checkedItem = true;
          })
        }
        // item.checked = !item.checked;
        // item.list.map(aItem => {
        //   aItem.checkedItem = !aItem.checkedItem;
        // })
      }
    })
    this.setData({
      billingRecordList: data,
    })
    this.updateAllStatus(data);
  },

  // 单选某一item时 是否设置全选 ---放弃
  updateAllStatus(data) {
    let tempNum = 0;
    let size = data.length;
    data.map(item => {
      if (item.checked) ++tempNum
    })
    this.setData({
      isShowCheckedAll: tempNum == size
    })
  },

  // 选中子项 ---放弃
  changeItemChecked(event) {
    let parent = event.currentTarget.dataset.parent;
    const parentNum = parent.list.length; // 当前父亲 list有多个

    let index = event.currentTarget.dataset.index;
    let data = this.data.billingRecordList;
    let activeNum = 0;

    // 当前父亲 list 有多个已经被选中
    data.map(item => {
      if (item.index == parent.index) {
        item.list.map(item1 => {
          if (item1.index == index) {
            item1.checkedItem = !item1.checkedItem;
          }
          if (item1.checkedItem) {
            ++activeNum
          }
        })
        activeNum == parentNum ? item.checked = true : item.checked = false;
      }
    })
    this.setData({
      billingRecordList: data,
      checkedNum: activeNum
    })
    this.updateAllStatus(data);
  },
  addZero(num) {
    return num < 10 ? '0' + num : num
  },

  getDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;

    this.setData({
      endTime: year + '-' + this.addZero(month),
      checkedMonth: year + '-' + this.addZero(month),
    })
  },
  // 选择时间
  bindDateChange(event) {
    this.getInvoiceRecord(event.detail.value)
    this.setData({
      checkedMonth: event.detail.value,
    })
  },
  // 全选 ---放弃
  checkedAll() {
    let data = this.data.billingRecordList;
    let status = this.data.isShowCheckedAll;
    data.map(item => {
      item.checked = !status;
    })
    this.setData({
      billingRecordList: data,
      isShowCheckedAll: !status
    })
  },
  previewImg: function (e) {
    const src = e.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src],
    })
    utils.saveImgToAlbum(src)
  },
  gotoDownloadEmail() {
    let arrIds = [];
    let data = this.data.billingRecordList;
    data.map(item => {
        if (item.checked) arrIds.push(item.id)
    })

    if (arrIds.length < 1) {
      wx.showToast({
        title: '请选择要下载的发票',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../../incomeInvoice/downloadPage/index/index?ids=' + arrIds,
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getInvoiceRecord('');
    this.getDate();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
console.log('上啦')
    if(this.data.current_page < this.data.total ){//这里是为了当前页数大于小于总页数，否则会一直刷新
      var current_page = this.data.current_page*1+1//上滑一次就加载下一页 在当前页数加一  就是加载下一页
      this.setData({
        current_page:this.data.current_page+1 //更新data重的页数
      })
      this.getInvoiceRecord('');
    }else{
      wx.showToast({
        title: '暂无更多数据',//如果当前页数大于总页数则不会刷新并显示提示
        icon: "none"
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})