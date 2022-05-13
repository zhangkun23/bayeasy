// app.js
App({
  onShow() {},
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
    })
  },
  onLaunch() {
    const barTitileStatus = wx.getMenuButtonBoundingClientRect()
    this.globalData.barTitileStatus = barTitileStatus
    wx.setStorageSync('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90ZXN0LmdzaC5jb21cL2dzaEFwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2NTIzNTAxOTYsImV4cCI6MTY1ODM1MDE5NiwibmJmIjoxNjUyMzUwMTk2LCJqdGkiOiJyUjZ5U3Jzd1U0U2xYakQ2Iiwic3ViIjoxMDQsInBydiI6IjA1ZDkyNDFlNjMyM2NlM2UwOWVjNjAxZThjYzVhMDc4ZTQ4NGY0NTIifQ.ahpxyBfQ5-yQvUk8Luw5QvSGFdtjdzjy8UUWxLhSgOw')
    // wx.setStorageSync('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9nc2guYmV0YS5pbnRlcm5hbC5iYXllYXN5LmNuOlwvZ3NoQXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY1MjE0OTQ1NiwiZXhwIjoxNzI0MTQ5NDU2LCJuYmYiOjE2NTIxNDk0NTYsImp0aSI6ImFrUUhYVWI4WFdjMmRQWUUiLCJzdWIiOjE5LCJwcnYiOiIwNWQ5MjQxZTYzMjNjZTNlMDllYzYwMWU4Y2M1YTA3OGU0ODRmNDUyIn0.u2b07j58dmOa2ddDfVUOY5_dfR1IQq_Sj3bHSsmZ8yU')
  },
  globalData: {
    barTitileStatus: null,
    imgPath: 'https://image.bayeasy.cn/images-datas/',
    emptyPic: 'https://image.bayeasy.cn/images-datas/public/emptyBackGround.png',
    pdfPath: 'https://image.bayeasy.cn/images-datas/pdf/',
    dev:'http://gsh.dev.corp.bayeasy.cn:11880/',
    phoneNumber: '400-090-6628', //客服电话
    userStatus: '', //用户状态 0 不为贝易资用户, 1 为贝易资用户未关联信息,2 已关联
    operate: false, //是否有运营人员
    todolistNum: 0, //待办数量
    page_size: 15,
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