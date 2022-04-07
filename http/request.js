// 引入env中的url
const { baseUrl } = require('./env.js').dev; 
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
    request: (url, method, data,  responseType) => {
        let _url = `${baseUrl}${url}`;
        let token = wx.getStorageSync('token') 
        return new Promise((resolve, reject) => {
			wx.showLoading({
				title: '正在加载',
			});
            wx.request({
                url: _url,
                data: data,
                method: method,
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer '+token,
                },
                responseType,
                success: (res) => {
                    // console.log('从接口获取到的数据', res);
                    let { code } = res.data;
					if(code===200) {
						resolve(res.data);
                        wx.hideLoading();
					}else if(code===401){
                        wx.showToast({
                            title: '登录过期，清重新登录',
                            icon: 'none',
                        })
                        wx.navigateTo({
                            url: '/pages/login/login/index',
                        })
                    }else {
						wx.showToast({
                            title: '数据请求错误',
                            icon: 'none',
						})
					}
                },
				fail() {
					reject('接口有误，请检查')
				}
            });
			
        });
    },
}

