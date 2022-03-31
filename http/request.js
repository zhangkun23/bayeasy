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
    request: (url, method, data, isSubDomain) => {
        console.log('这是我封装的ajax请求', baseUrl);
      	//这里使用ES6的写法拼接的字符串
        // let _url = `${baseUrl}/${isSubDomain ? subDomain: '' }${url}`;
        let _url = `${baseUrl}${url}`;
        let token = getApp().globalData.token;

        // console.log('token----'+token)
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
                    'Authorization': token?token:''
                },
                success: (res) => {
                    // console.log('从接口获取到的数据', res);
                    let { code } = res.data;
					if(code===200) {
						resolve(res.data);
						wx.hideLoading();
					}else {
						wx.showToast({
							title: '数据请求错误',
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

