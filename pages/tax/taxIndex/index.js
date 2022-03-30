// pages/tax/taxIndex/index.js
Component({
    pageLifetimes: {
        show() {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
            selected: 3
            })
        }
        // 获取token
        console.log(getApp().globalData.token)
        }
    }
})
  