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
    // wx.setStorageSync('open_id','olXtf49M8xkKY5Qu1ClC9RBBH-cg')

    // wx.setStorageSync('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9nc2guYmV0YS5jb3JwLmJheWVhc3kuY246MTE4ODBcL2dzaEFwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2NTY1NzEyMTAsImV4cCI6MTcyODU3MTIxMCwibmJmIjoxNjU2NTcxMjEwLCJqdGkiOiJDdlUzdnZqQVhiSkx0Z0xNIiwic3ViIjoxMiwicHJ2IjoiMDVkOTI0MWU2MzIzY2UzZTA5ZWM2MDFlOGNjNWEwNzhlNDg0ZjQ1MiJ9.PbnomcNlfbE50OSS_sjd6Z1YLJXKz-XV-D83WhWoa6s')
    // wx.setStorageSync('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9nc2guYmV0YS5jb3JwLmJheWVhc3kuY246MTE4ODBcL2dzaEFwaVwvYXV0aFwvd3hsb2dpbiIsImlhdCI6MTY1NjU1NDYyOSwiZXhwIjoxNzI4NTU0NjI5LCJuYmYiOjE2NTY1NTQ2MjksImp0aSI6ImtxM1N5eVlxaEF6cTFyZUUiLCJzdWIiOjE5LCJwcnYiOiIwNWQ5MjQxZTYzMjNjZTNlMDllYzYwMWU4Y2M1YTA3OGU0ODRmNDUyIn0.48ECA1A6LSJ8OJ-CBGgiAve_Gj4dYbOgH9V73rvjTq4')
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
    app_id: "wx8c15bc82c287b2b7",  // 本人的appid 
    // open_id: 'olXtf460cBzc5mW5rfjmxfRYvN68', // 我的用户id  登录后返回在微信支付时使用
    // open_id: 'olXtf49M8xkKY5Qu1ClC9RBBH-cg', // 用户id  登录后返回在微信支付时使用
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
