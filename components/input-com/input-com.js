// components/input-com/input-com.js
const tempPath = getApp().globalData.imgPath;
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: { //input名称
            type: String,
            value: 'title'
        },
        placeholder: {
            type: String,
            value: '请输入'
        },
        inputValue: { //value
            type: String,
            value: ''
        },
        clearShow: { //是否显示清除image
            type: Boolean,
            value: true
        },
        key: { //父组建接收key
            type: String,
            value: ''
        },
        disabled: { //disabled
            type: Boolean,
            value: false
        },
        must: { //是否必填
            type: Boolean,
            value: false
        },
        icon_rl: {
            type: Boolean,
            value: false
        },
        icon_down: {
            type: Boolean,
            value: false
        },
        type: {
            type: String,
            value: 'text'
        },
        maxlength: {
            type: Number,
            value: 200
        },
        dateValue: {
            type: String,
            value: ''
        },
        dateStart: {
            type: String,
            value: ''
        },
        dateEnd: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        inputClose: tempPath + "public/inputClose.png",
        rl: tempPath + "invoice/invoiceUpdate/rl.png",
        down: tempPath + "invoice/invoiceUpdate/down.png",
        clearHidden: true,
        inputValue: '',
        title: '手机号',
        placeholder: '请输入手机号'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 监听input输入
        onInput(e) {
            if (this.data.inputValue) {
                this.setShow(false)
            } else {
                this.setShow(true)
            }
            let param = {
                key: e.currentTarget.dataset.key,
                value: this.data.inputValue
            }
            this.triggerEvent('setInputValue', param)
        },
        // 获取焦点
        onFocus() {
            if (this.data.inputValue) {
                this.setShow(false)
            }
        },
        // 失去焦点
        onBlur() {
            this.setShow(true)
        },
        // 清空input
        clearInput() {
            setTimeout(() => {
                this.setData({
                    inputValue: ''
                })
                this.setShow(true)
            }, 200);
            // this.setData({
            //     inputValue: ''
            // })
        },
        // 显示/隐藏 closeImg
        setShow(type) {
            if (!type) {
                this.setData({
                    clearHidden: false
                })
            } else {
                this.setData({
                    clearHidden: true
                })
            }
        },
        // input点击事件
        onShowDate(e) {
            this.triggerEvent('inputShowClick', {
                key: e.currentTarget.dataset.key,
            })
        },
        bindDateChange(e) {
            this.setData({
                inputValue: e.detail.value
            })
            this.triggerEvent('setInputValue', {
                data: e.detail.value
            })
            if (this.data.inputValue) {
                this.setShow(false)
            } else {
                this.setShow(true)
            }
        }
    }
})