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

	/**
	 * 发送验证码
	 * @param { mobile:'18513136572'}  
	 */
	captcha:(param)=>{
		return request('/gshApi/auth/login/captcha','POST',param);
	},

	/* 退出登录 */
	logout:()=>{
		return request('/gshApi/auth/logout','GET',{},true);
	},

	/* 查询代办事项 */
	todolist:()=>{
		return request('/gshApi/personal_nformation/todolist','GET',{});
	},

	/* 用户关联状态 */
	getUserStatus:()=>{
		return request('/gshApi/personal_nformation/bayeasy_user_status','GET',{});
	},

	/* 是否有所属运营人员 */
	myOperate:()=>{
		return request('/gshApi/personal_nformation/my_operate','GET',{});
	},





	
	
}

