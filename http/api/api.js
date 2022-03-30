//通用接口
const { request } = require('../request.js')
//基于业务封装的接口
module.exports={

	/**
	 * 登录
	 * @param { mobile:'18513136572',captcha:'111111'}  
	 */
	login:(param)=>{
		return request('/gshApi/auth/login','POST',param);
	},

	/* 退出登录 */
	logout:()=>{
		return request('/gshApi/auth/logout','GET',{},true);
	},


	
	
}

