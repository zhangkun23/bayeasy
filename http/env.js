    const version = __wxConfig.envVersion;
    let baseUrl;
    let payUrl;
    switch (version) {
        case "develop": //开发预览版
            baseUrl = "https://cs.bayeasy.cn/betaApi";
            payUrl = "https://cs.bayeasy.cn/";
            break;
        case 'trial': //体验版
            baseUrl = "https://cs.bayeasy.cn/betaApi";
            break;
        case 'release': //正式版
            baseUrl = "https://cs.bayeasy.cn/api";
            break;
        default: //未知,默认调用正式版
            break;
    }
    
    //这里使用的接口呢都是自己模拟的，可以根据自己的需求进行添加
    module.exports = {
        //开发环境的url
        dev: {
            baseUrl,
            payUrl
        },
        //测试环境url
        test: {
            baseUrl
        },
        //线上环境url
        prod: {
            baseUrl: 'https://cs.bayeasy.cn/api'
        }
    }