// pages/tax/report/balance/index.js
const utils = require('../../../../utils/util');
const imgpath = getApp().globalData.imgPath;
const {
  reportForm,
  getQuarter
} = require('../../../../http/api/api_csbl');

Page({
  data: {
    dropdown: imgpath + 'report/dropdown_icon.png',
    date: imgpath + 'report/date_green.png',
    empty_bg_url: imgpath + 'public/emptyBackGround.png',
    checkedMonth: '',
    startTime: '',
    endTime: '',
    year: '',
    month: '',
    reportImg: '', // 保存图片的路径
    isShowModal: false,
    isShowSaveModal: false,
    isShwoData: false,
    reportFormObj: {},
    buttons: [{
        text: '取消'
      },
      {
        text: '确认'
      }
    ],
    saveImgBtn: [{
        text: '知道了'
      },
    ],
  },

  onLoad: function (options) {
    this.getFullYears();
    this.getNowDate();
    this.getReportContent();
  },
  // 获取当前月份默认展示上个月
  getNowDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    // let lastTime = (year + 1) + '-' + (month = 12);
    if (month == 0) {
      month = 12
      year = year - 1
    }
    if (month < 10) {
      month = '0' + month
    } else {
      month = month
    }

    this.setData({
      year,
      month,
      endTime: year + '-' + month,
      checkedMonth: year + '-' + month
    })
  },
  // 获取商事主体创建时间
  getFullYears() {
    getQuarter().then(res => {
      console.log(res)
      if (res.ret) {
        let date = res.data[0].year + '-' + res.data[0].month
        console.log(date)
        this.setData({
          startTime: date,
        })
      }
    })
  },
  // 获取报表内容
  getReportContent() {
    let params = {
      type: 1,
      year: this.data.year,
      month: this.data.month,
    }
    reportForm(params).then(res => {
      if (res.ret) {
        if (!res.data.image) {
          this.setData({
            reportImg: '',
            reportFormObj: res.data,
          })
        } else {
          this.setData({
            reportFormObj: res.data,
            reportImg: res.data.image
          })
        }
      }
    })
  },

  saveImg() {
    this.setData({
      isShowModal: true
    })
  },

  tapDialogButton(e) {
    if (e.detail.item.text === "取消") {
      this.setData({
        isShowModal: false,
      })
    } else {
      this.setData({
        isShowModal: false,
        isShowSaveModal: true
      })
    }
  },
  tapDialogSaveButton(e) {
    if (e.detail.item.text == '取消') {
      this.setData({
        isShowModal: false,
        isShowSaveModal: false,
      })
    } else {
      this.downloadImg()
      this.setData({
        isShowSaveModal: false,
        isShowModal: false,
      })
    }
  },

  // 修改日期
  changeDate(event) {
    if (this.data.reportFormObj.image) {
      this.setData({
        reportFormObj: {
          image: '',
          company_name: this.data.reportFormObj.company_name,
          tax_number: this.data.reportFormObj.tax_number,
        }
      })
    }
    let value = event.detail.value.split('-');
    let year = value[0];
    let month = value[1];
    this.setData({
      checkedMonth: event.detail.value,
      year,
      month
    })
    this.getReportContent();
    console.log(this.data.checkedMonth)

  },
  // 保存图片
  downloadImg: function () {
    let url = this.data.reportImg;
    // const url = 'https://image.bayeasy.cn/images-datas/report/balance_list.png'
    utils.saveImgToAlbum(url)
  },
  // togglePicker: function () {
  //   this.setData({
  //     showpicker: !this.data.showpicker
  //   })
  // },
  // bindPickerChange: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     index: e.detail.value
  //   })
  // },
  // 图片放大
  previewImg: function (e) {
    const src = e.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src],
    })
  }
})