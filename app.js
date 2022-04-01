// app.js

const {
  todolist,
  getUserStatus,
  myOperate
} = require('/http/api/api.js')

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  onShow(){
    // 查询待办
    todolist().then(res => {
      if(res.ret){
        getApp().globalData.todolistNum =  res.data.nums;
      }
    })
    /**
     * 查询用户关联状态 /决定路由跳转地址
     *  0 不为贝易资用户
     *  1 为贝易资用户未关联信息
     *  2 已关联
     */
    getUserStatus().then(res => {
      if(res.ret){
        getApp().globalData.userStatus =  res.data.status;
      }
    })
    // 是否有运营人员
    myOperate().then(res => {
      if(res.ret){
        getApp().globalData.operate = true;
      }
    })
  },
  globalData: {
    imgPath:'https://image.bayeasy.cn/images-data/',
    pafPath:'https://image.bayeasy.cn/images-data/pdf/',
    userInfo: null,
    token:'',
    mobile:'', //用户手机号中间加密
    phoneNumber:'400-090-6628', //客服电话
    userStatus:'', //用户状态
    operate:false, //是否有运营人员
    todolistNum:0,
  }
})
