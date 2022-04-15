// pages/enterprise/enterpriseIndex/index.js
const utils = require('../../../utils/util.js')
Component({
    pageLifetimes: {
        show() {
            utils.getTabBarIndex(this,0);
            const barTitileStatus = wx.getMenuButtonBoundingClientRect()
            this.setData({statusBarHeight: barTitileStatus.bottom + 32})
        }
    },
    lifetimes: {
        ready() {
            setTimeout( ()=> {
                this.setData({
                    pageShow:true
                })
            },30)
        },
    },
    data: {
        statusBarHeight: 30,
        pageShow:false
    }
})