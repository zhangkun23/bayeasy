// app.js

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    imgPath:'https://image.bayeasy.cn/images-data/',
    pafPath:'https://image.bayeasy.cn/images-data/pdf/',
    userInfo: null,
    token:'',
    mobile:'', //用户手机号中间加密
    idCard:'', //身份证号前三位显示 后面密文
    phoneNumber:'400-090-6628', //客服电话
    userStatus:'', //用户状态 0 不为贝易资用户, 1 为贝易资用户未关联信息,2 已关联
    operate:false, //是否有运营人员
    todolistNum:0,
  }
})