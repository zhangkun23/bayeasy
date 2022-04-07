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
            let that = this;
            const barTitileStatus = wx.getMenuButtonBoundingClientRect()
            this.setData({statusBarHeight: barTitileStatus.bottom + 32})
        }
    },
    data: {
        statusBarHeight: 30,
    }
})