// pages/invoice/invoiceIndex/index.js
const tempPath = getApp().globalData.imgPath+'invoice/gates/';
const utils = require('../../../utils/util.js')
Component({
    pageLifetimes: {
        show() {
            utils.getTabBarIndex(this,1);
            const barTitileStatus = wx.getMenuButtonBoundingClientRect()
            this.setData({statusBarHeight: barTitileStatus.bottom + 32})
        }
    },
    data: {
        statusBarHeight: 30,
        zdfp:tempPath + 'incomeInvoice.png', 
        zdmx:tempPath + 'srzdmx.png', 
        cbfp:tempPath + 'acquisitionCost.png', 
        fpmx:tempPath + 'acquisitionDetails.png', 
    },
    methods:{
        handelClickUrl(e){
            // return;
            const url = e.currentTarget.dataset.url;
            utils.navigateTo(url)
        }
    }
})