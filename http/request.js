// 引入env中的url
const {
    baseUrl
} = require('./env.js').dev;
//在这里添加我们的专业域名
const subDomain = 'xxx';
module.exports = {
    /**
     * 二次封装wx.request
     * url:请求的接口地址
     * method:请求方式 GET,POST....
     *  data:要传递的参数
     *isSubDomain:表示是否添加二级子域名 true代表添加, false代表不添加
     */
    request: (url, method, data, responseType) => {
        let _url = `${baseUrl}${url}`;
        let token = wx.getStorageSync('token')
        return new Promise((resolve, reject) => {
            // wx.showLoading({
            //     title: 'loading',
            // });
            wx.request({
                url: _url,
                data: data,
                method: method,
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + token,
                },
                responseType,
                success: (res) => {
                    // console.log('从接口获取到的数据', res);
                    let {
                        code
                    } = res.data;
                    if (code === 200) {
                        resolve(res.data);
                    }
                },
                fail() {
                    reject('接口有误，请检查')
                },
                complete(res, err) {
                    wx.hideLoading({
                        complete: function (hide) {
                            // console.log("关闭loading成功: ", hide)
                            if (err) {
                                wx.showToast({
                                    title: '网络有问题哦！请稍后再试试！',
                                    icon: 'none',
                                })
                            } else {
                                if (res.data.code === 401) {
                                    wx.showToast({
                                        title: '登录过期，清重新登录',
                                        icon: 'none',
                                    })
                                    wx.navigateTo({
                                        url: '/pages/login/login/index',
                                    })
                                    wx.setStorageSync('token', '') // 清理缓存中token
                                } else if (res.data.code === 200) {} else {
                                    wx.showToast({
                                        title: res.data.message || '网络有问题哦！请稍后再试试！',
                                        icon: 'none',
                                    })
                                }
                            }

                        }
                    });

                }
            });

        });
    },
    /** 统一域名 */
    baseUrl: baseUrl
}