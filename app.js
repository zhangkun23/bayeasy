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
    // wx.setStorageSync('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9nc2guYmV0YS5pbnRlcm5hbC5iYXllYXN5LmNuOlwvZ3NoQXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY1MzM4NDYzNSwiZXhwIjoxNzI1Mzg0NjM1LCJuYmYiOjE2NTMzODQ2MzUsImp0aSI6InZaM3o0RUhCR01aT3c3bm8iLCJzdWIiOjE5LCJwcnYiOiIwNWQ5MjQxZTYzMjNjZTNlMDllYzYwMWU4Y2M1YTA3OGU0ODRmNDUyIn0.JkjSKv7W_BJey6dC2iGbRd1DOr6ZMGfljBB5J5muOVs')
    // wx.setStorageSync('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9nc2guYmV0YS5pbnRlcm5hbC5iYXllYXN5LmNuOlwvZ3NoQXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY1MzM4NDYzNSwiZXhwIjoxNzI1Mzg0NjM1LCJuYmYiOjE2NTMzODQ2MzUsImp0aSI6InZaM3o0RUhCR01aT3c3bm8iLCJzdWIiOjE5LCJwcnYiOiIwNWQ5MjQxZTYzMjNjZTNlMDllYzYwMWU4Y2M1YTA3OGU0ODRmNDUyIn0.JkjSKv7W_BJey6dC2iGbRd1DOr6ZMGfljBB5J5muOVs')
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