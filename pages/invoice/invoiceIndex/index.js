// pages/invoice/invoiceIndex/index.js
Component({
    pageLifetimes: {
        show() {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
            selected: 1
            })
        }
        }
    }
})
  