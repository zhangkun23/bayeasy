// app.js
App({
  onShow(){
  },
  watch(method){
    var obj = this.globalData;
    Object.defineProperty(obj,"todolistNum", {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this._name = value;
        method(value);
      },
      get:function(){
        return this._name
      }
    })
  },
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
  },
  globalData: {
    imgPath:'https://image.bayeasy.cn/images-data/',
    pafPath:'https://image.bayeasy.cn/images-data/pdf/',
    dev:'http://gsh.dev.corp.bayeasy.cn:11880/',
    phoneNumber:'400-090-6628', //客服电话
    userStatus:'', //用户状态 0 不为贝易资用户, 1 为贝易资用户未关联信息,2 已关联
    operate:false, //是否有运营人员
    todolistNum:0, //待办数量
  },
  /**
   * 登录接口保存信息在storage
   * 查询：通过 wx.getStorageSync('xxx')
   */
  storage:{ 
    token:'', //token
    mobile:'', //手机号
    idCard:'' //身份证号前三位显示 后面密文
  }
})