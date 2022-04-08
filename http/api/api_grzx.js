//财税办理
const { request } = require('../request.js')
//基于业务封装的接口
module.exports={

	/**
	 * 登录
	 * @param { mobile:'18513136572',captcha:'111111'}  
	 */
	check_operate:(param)=>{
		return request('/gshApi/personal_nformation/my_operate','GET',{},true);
	},

	/* 获取二维码 */
	// get_operate:()=>{
	// 	return request('/gshApi/personal_nformation/operate_wx','GET',{},'arrayBuffer');
	// },
	get_operate:()=>{
		return request('/gshApi/personal_nformation/operate_wx_qrcode','GET',{});
	},

	
	
}

