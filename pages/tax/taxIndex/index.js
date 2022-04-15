// pages/tax/taxIndex/index.js
const utils = require('../../../utils/util.js')
Component({
    pageLifetimes: {
        show() {
            utils.getTabBarIndex(this,3);
            const barTitileStatus = wx.getMenuButtonBoundingClientRect()
            this.setData({
                statusBarHeight: barTitileStatus.bottom + 32,
            })
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
        pageShow:false,
    },
    methods: {
        gotoList: function () {
            wx.navigateTo({
              url: '../taxreturn/index',
            })
        }
    }
    
})