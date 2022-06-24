// components/imgRetou.js
const utils = require('../../utils/util');
const tempPath = getApp().globalData.imgPath;
const rotateIcon = tempPath + "tax/businessAnnual/rotate_icon.png"
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isShow: { //是否显示
            type: Boolean,
            value: false
        },
        imgUrl: { //图片url
            type: String,
            value: ''
        },
        isDownLoad:{ //是否支持保存图片
            type:Boolean,
            value:false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        rotateIcon:rotateIcon,
        transform: "",
        transformStatus: true,
        touch: {
            distance: 0, //两点直线距离
            scaleWidth: 100,
        },
        touchesNum:0, //触屏个数
        touchstart:0, //长按开始事件
        touchend:0, //结束时间
        timestart:0, //开始时间

    },

    /**
     * 组件的方法列表
     */
    methods: {
        rotationClick() {
            console.log('旋转')
            let status = this.data.transformStatus;
            if (status) {
                this.setData({
                    transform: 'rotate(90deg)',
                    transformStatus: !status,
                })
            } else {
                this.setData({
                    transform: 'rotate(0deg)',
                    transformStatus: !status,
                })
            }
        },

        /**
         * 触屏开始
         * 1 单指点击记录 开始时间/触屏个数
         * 2 双值点击记录 两点之间距离
         */
        touchStartHandle(e) {
            this.setData({
                touchesNum:e.touches.length
            })
            if (e.touches.length == 1) {
                var timestart = new Date().getTime();
                this.setData({
                    timestart:timestart,
                })
                return
            }
            let touches = e.touches;
            // AB的距离 = X1-X2的平方 + Y1-Y2的平方  开根号
            let distance = Math.sqrt(Math.pow((touches[0].pageX - touches[1].pageX), 2) + Math.pow((touches[0].pageY - touches[1].pageY), 2));
            this.setData({
                'touch.distance': distance,
            })
        },
        /**
         * 触屏进行中
         * 动态计算开始触屏两点距离 与 移动两点距离 差值
         */
        touchMoveHandle(e) {
            let touch = this.data.touch
            // 单手指缩放我们不做任何操作 
            if (e.touches.length == 1) {
                return
            }
            let touches = e.touches;
            // AB的距离 = X1-X2的平方 + Y1-Y2的平方  开根号
            let distanceNew = Math.sqrt(Math.pow((touches[0].pageX - touches[1].pageX), 2) + Math.pow((touches[0].pageY - touches[1].pageY), 2));
            // 两点移动过后 与 最出两支落点距离差
            let move = distanceNew - touch.distance;
            if (move > 0 && touch.scaleWidth < 200) {
                this.setData({
                    'touch.scaleWidth': (touch.scaleWidth + 6),
                })
            } else if (move < 0 && touch.scaleWidth > 100) {
                this.setData({
                    'touch.scaleWidth': (touch.scaleWidth - 6),
                })
            }
        },
        /**
         * 触屏结束 --》点击关闭
         * 1 兼容条件---》单指点击
         * 2 兼容条件---》触屏时间< 200
         */
        touchEndHandle(e){
            if (this.data.touchesNum == 1) {
                var timeEnd = new Date().getTime();
                // time < 200 认定为单机事件
                let time = parseInt(timeEnd) - parseInt(this.data.timestart);
                if(time < 200){
                    this.triggerEvent('closeImgPreviewRotation');
                }else if(time> 500 && this.data.isDownLoad){
                    utils.saveImgToAlbum(this.data.imgUrl)
                }
            }
        },

        /**
         * 长按保存事件
         * 兼容条件---》单指长按
         * 长按与touch事件冲突 展示不用
         */
        longtap(){
            // var timeEnd = new Date().getTime();
            // let time = parseInt(timeEnd) - parseInt(this.data.timestart);
            // console.log("长按时间---"+time)
            // if(this.data.touchesNum==1 && time >600){
            //     utils.saveImgToAlbum(this.data.imgUrl)
            // }
        },
    }
})