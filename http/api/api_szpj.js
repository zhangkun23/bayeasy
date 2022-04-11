//企业信息
const { request } = require('../request.js')
const api = '';
//基于业务封装的接口
module.exports={
    /*查询收货地址*/
    getUserMeg:()=>{
        return request(api + '/personal_nformation/mail_address','GET',{});
    },

    //手动踢啊家增值发票
    updateHandlInvoice:(param)=>{
		return request(api+'/auth/deduct_invoice/submit_deduct_invoice','POST',param);
	},


}

