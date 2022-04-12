// pages/enterprise/enterpriseIndex/index.js
const utils = require('../../../utils/util.js')
Component({
    pageLifetimes: {
        show() {
            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                    selected: 0
                })
            }
            utils.getTabBarIndex(this,0);
            const barTitileStatus = wx.getMenuButtonBoundingClientRect()
            this.setData({statusBarHeight: barTitileStatus.bottom + 32})

        }
    },
    data: {
        statusBarHeight: 30,
    }
})