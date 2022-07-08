// app.js

const {
  asgetOperateList
} = require("./utils/util")
App({
  onShow() {
    asgetOperateList()
  },
  watch(method) {
    var obj = this.globalData;
    Object.defineProperty(obj, "todolistNum", {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this._name = value;
        method(value);
      },
      get: function () {
        return this._name
      }
    });
    Object.defineProperty(obj, "closeModal", {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this._name = value;
        method(value);
      },
      get: function () {
        return this._name
      }
    });
  },
  onLaunch() {
    const barTitileStatus = wx.getMenuButtonBoundingClientRect()
    this.globalData.barTitileStatus = barTitileStatus
    // wx.setStorageSync('open_id','olXtf49M8xkKY5Qu1ClC9RBBH-cg')

    wx.setStorageSync('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9nc2guYmV0YS5jb3JwLmJheWVhc3kuY246MTE4ODBcL2dzaEFwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2NTcyNzI3NzgsImV4cCI6MTcyOTI3Mjc3OCwibmJmIjoxNjU3MjcyNzc4LCJqdGkiOiJHNDY1eFpZNE9XenRBZUJHIiwic3ViIjoxODEsInBydiI6IjA1ZDkyNDFlNjMyM2NlM2UwOWVjNjAxZThjYzVhMDc4ZTQ4NGY0NTIifQ.2r9JHpHRCB_Qfoksse00qz9q4KIXnd_jFPGGNI95bVY')
    // wx.setStorageSync('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9nc2guYmV0YS5jb3JwLmJheWVh,c3kuY246MTE4ODBcL2dzaEFwaVwvYXV0aFwvd3hsb2dpbiIsImlhdCI6MTY1NjkxNzE5MiwiZXhwIjoxNzI4OTE3MTkyLCJuYmYiOjE2NTY5MTcxOTIsImp0aSI6IlMyZXk5YUxZa3ZzZktjdVkiLCJzdWIiOjE5LCJwcnYiOiIwNWQ5MjQxZTYzMjNjZTNlMDllYzYwMWU4Y2M1YTA3OGU0ODRmNDUyIn0.DJ-dgoWlznyzVpWwRS81USoBw4GkrwT2shLIAfsPoBw')
  },
  globalData: {
    barTitileStatus: null,
    imgPath: 'https://image.bayeasy.cn/images-datas/',
    emptyPic: 'https://image.bayeasy.cn/images-datas/public/emptyBackGround.png',
    pdfPath: 'https://image.bayeasy.cn/images-datas/pdf/',
    dev: 'http://gsh.dev.corp.bayeasy.cn:11880/',
    phoneNumber: '400-090-6628', //客服电话
    userStatus: '', //用户状态 0 不为贝易资用户, 1 为贝易资用户未关联信息,2 已关联
    operate: false, //是否有运营人员
    todolistNum: 0, //待办数量
    page_size: 15,
    app_id: "wx8c15bc82c287b2b7",
    closeModal: true,
    currentOperation: null // 运营人员数组
  },
  /**
   * 登录接口保存信息在storage
   * 查询：通过 wx.getStorageSync('xxx')
   */
  storage: {
    token: '', //token
    mobile: '', //手机号
    idCard: '' //身份证号前三位显示 后面密文
  }
})