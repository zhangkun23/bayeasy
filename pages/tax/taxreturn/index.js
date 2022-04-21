const tempPath = getApp().globalData.imgPath;
const utils = require('../../../utils/util.js')
Page({
  data: {
    icon1: tempPath + 'tax/taxreturn/icon1.png',
    icon2: tempPath + 'tax/taxreturn/icon2.png',
    icon3: tempPath + 'tax/taxreturn/icon3.png',
  },
  handeClick(e){
    const url = e.currentTarget.dataset.url;
    utils.navigateTo(url);
  },
})