	//这里使用的接口呢都是自己模拟的，可以根据自己的需求进行添加
    module.exports={
        //开发环境的url
        dev:{
            baseUrl:"https://cs.bayeasy.cn/betaApi"
        }, 
        //测试环境url
        test:{
            baseUrl:"http://www.test.com"
        },
        //线上环境url
        prod:{
            baseUrl:'https://cs.bayeasy.cn/api'
        },
        prod_host: {
            baseUrl: 'https://cs.bayeasy.cn/api'
        }
    }
    
    