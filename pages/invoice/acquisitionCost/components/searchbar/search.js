// pages/invoice/acquisitionCost/components/searchbar/search.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isActive: {
            type: Boolean,
            value: false
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        searchIcon: app.globalData.imgPath + 'invoice/acquisitionCost/searchIcon.png',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        setKey: function (event) {
            const key = event.detail.value
            this.triggerEvent("inputkey", key)
        }
    }
})