// pages/tax/taxIndex/index.js
const utils = require('../../../utils/util.js')
Component({
    pageLifetimes: {
        show() {
            utils.getTabBarIndex(this, 3);
            const barTitileStatus = wx.getMenuButtonBoundingClientRect()
            this.setData({
                statusBarHeight: barTitileStatus.bottom + 32,
            })
        }
    },
    lifetimes: {
        ready() {
            setTimeout(() => {
                this.setData({
                    pageShow: true
                })
            }, 30)
        },
    },
    data: {
        trGateBtn: app.globalData.imgPath + "tax/gates/taxReturn.png",
        fsGateBtn: app.globalData.imgPath + "tax/gates/financialStatements.png",
        arGateBtn: app.globalData.imgPath + "tax/gates/annualReport.png",
        avGateBtn: app.globalData.imgPath + "tax/gates/annuelVersement.png",
        statusBarHeight: 30,
        pageShow: false,
        showModal: false,
        textInfo: '登录/注册',
        userStatus: 2,
        contents: ["为便于贝易资为您提供更为完善的服务", "需要您先完成身份信息安全校验"]
    },
    methods: {
        handelClickUrl(e) {
            const url = e.currentTarget.dataset.url;
            if (!wx.getStorageSync('token')) {
                this.setData({
                    showModal: true,
                    textInfo: '登录/注册',
                    contents: ["为便于贝易资为您提供更为完善的服务", "需您先登录贝易资并完成身份信息安全校验"]
                })
                return;
            }
            if (getApp().globalData.userStatus != 2) {
                this.setData({
                    showModal: true,
                    textInfo: '完善个人信息',
                    contents: ["为便于贝易资为您提供更为完善的服务", "需要您先完成身份信息安全校验"]
                })
                return;
            }
            utils.navigateTo(url)
        },
        goLogin() {
            let userStatus = this.data.userStatus; //用户状态 0 不为贝易资用户, 1 为贝易资用户未关联信息,2 已关联
            if (this.data.textInfo == '登录/注册') {
                utils.navigateTo('/pages/login/login/index')
                this.setData({
                    showModal: false,
                })
            } else {
                this.jumpUrl(userStatus);
            }
        },
    }

})