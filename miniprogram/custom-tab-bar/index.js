Component({
    data: {
      selected: 0,
      color: "#7A7E83",
      selectedColor: "#3cc51f",
      list: [{
        pagePath: "/pages/enterprise/enterpriseIndex/index",
        text: "企业信息",
        iconPath:'/image/icon/declare.png',
        selectedIconPath:'/image/icon/declare_check.png',
      }, {
        pagePath: "/pages/invoice/invoiceIndex/index",
        text: "收支票据",
        iconPath:'/image/icon/declare.png',
        selectedIconPath:'/image/icon/declare_check.png',
      }
      ,{
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath:'/image/icon/declare.png',
        selectedIconPath:'/image/icon/declare_check.png',
      }
      , {
        pagePath: "/pages/tax/taxIndex/index",
        text: "财税办理",
        iconPath:'/image/icon/declare.png',
        selectedIconPath:'/image/icon/declare_check.png',
      },  {
        pagePath: "/pages/personal/personalIndex/index",
        text: "个人中心",
        iconPath:'/image/icon/declare.png',
        selectedIconPath:'/image/icon/declare_check.png',
      }
    ]
    },
    attached() {
    },
    methods: {
      switchTab(e) {
        const data = e.currentTarget.dataset
        const url = data.path
        console.log(data)
        this.setData({
          selected: data.index
        })
        wx.switchTab({url:url})
        this.setData({
          selected: data.index
        })

        setTimeout( item => {
          this.setData({
            selected: data.index
          })
        },1000)
      }
    }
  })