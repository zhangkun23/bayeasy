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
            const barTitileStatus = wx.getMenuButtonBoundingClientRect()
            this.setData({
                statusBarHeight: barTitileStatus.bottom + 32
            })

        }
    },
    data: {
        statusBarHeight: 30,
    }
    
})