// pages/classroom/index.js
const tempPath = getApp().globalData.imgPath;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        left_white: tempPath + 'index/left_white.png',
        left_orange: tempPath + 'index/left_orange.png',
        right_white: tempPath + 'index/right_white.png',
        right_orange: tempPath + 'index/right_orange.png',
        imageArr: [{
                img: tempPath + 'index/xkt1.png'
            },
            {
                img: tempPath + 'index/xkt2.png'
            },
            {
                img: tempPath + 'index/xkt3.png'
            },
            {
                img: tempPath + 'index/xkt4.png'
            },
            {
                img: tempPath + 'index/xkt5.png'
            },
            {
                img: tempPath + 'index/xkt6.png'
            },
            {
                img: tempPath + 'index/xkt7.png'
            },
            {
                img: tempPath + 'index/xkt8.png'
            },
            {
                img: tempPath + 'index/xkt9.png'
            },
            {
                img: tempPath + 'index/xkt10.png'
            },
        ],
        currentNum: 0,
        isRight: false,
        isLeft: false,
    },
    previewImg: function (e) {
        const src = e.currentTarget.dataset.src
        wx.previewImage({
            urls: [src],
        })
    },

    changeImage(e) {
        const value = e.detail.current;
        this.setData({
            currentNum: value
        })
    },
    changeLeft() {
        let num = this.data.currentNum - 1;
        let length = this.data.imageArr.length - 1;
        if (num < 0) {
            num = length;
            // this.setData({
            //   isLeft: true,
            //   isRight: true
            // })
        } else if (num == this.data.imageArr.length) {
            num = 0;
        }
        this.setData({
            currentNum: num
        })
    },

    changeRight() {
        let num = this.data.currentNum + 1;
        if (num < this.data.imageArr.length) {
            num + 1;
            // this.setData({
            //   isLeft: false,
            //   isRight: false
            // })
        } else if (num == this.data.imageArr.length) {
            num = 0;
        }
        this.setData({
            currentNum: num
        })
    },

})