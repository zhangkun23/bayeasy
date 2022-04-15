// pages/invoice/acquisitionCost/components/searchbar/search.js
const app = getApp()
Component({
    pageLifetimes: {
        show: function () {
            var that = this;
            let query = wx.createSelectorQuery().in(this);
            query.select('#searchbar').boundingClientRect();
            query.exec(function (res) {
                if (res.length > 0 && res[0] !== null) {
                    that.setData({
                        filterTop: res[0].width - 50 - 25
                    })
                }
            })
        }
    },
    /**
     * 组件的属性列表
     */
    properties: {
        isActive: {
            type: Boolean,
            value: false
        },
        searchKey: {
            type:String,
            value:''
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        inputWidth: 300,
        searchIcon: app.globalData.imgPath + 'invoice/acquisitionCost/searchIcon.png',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        setKey: function (event) {
            const key = event.detail.value
            this.setData({
                searchKey: key
            })
            this.triggerEvent("inputkey", key)
        },
        goSearch: function(event){
            console.log("!", event)
            this.triggerEvent("gosearch", event.detail.value)
        }
    }
})