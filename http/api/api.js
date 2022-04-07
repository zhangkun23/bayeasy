//通用接口
const { request } = require('../request.js')
//基于业务封装的接口
const api = '/gshApi';
module.exports={
	/**
	 * 登录
	 * @param { mobile:'18513136572',captcha:'111111'}  
	 */
	login:(param)=>{
		return request(api+'/auth/login','POST',param);
	},

	/**
	 * 发送验证码
	 * @param { mobile:'18513136572'}  
	 */
	captcha:(param)=>{
		return request(api+'/auth/login/captcha','POST',param);
	},

	/* 退出登录 */
	logout:()=>{
		return request(api+'/auth/logout','GET',{},true);
	},

	/* 查询代办事项 */
	todolist:()=>{
		return request(api+'/personal_nformation/todolist','GET',{});
	},

	/* 用户关联状态 */
	getUserStatus:()=>{
		return request(api+'/personal_nformation/bayeasy_user_status','GET',{});
	},

	/* 是否有所属运营人员 */
	myOperate:()=>{
		return request(api+'/personal_nformation/my_operate','GET',{});
	},

	/* 个人身份信息_身份证照片提交ocr识别 */
	IdCardOCR:()=>{
		return request(api+'/personal_nformation/ocr_idcard','POST',{});
	},

	/* 个人身份信息_身份证信息提交 */
	IDcardSubmit:(param)=>{
		return request(api+'/personal_nformation/submit','POST',param);
	},

	/* 个人身份信息_身份证信息提交 */
	IdcardAuthentication:(param)=>{
		return request(api+'/personal_nformation/authentication','POST',param);
	},

	/* 获取客服专员二维码 */
	// getOperateQR: ()=>{
	// 	return api+'/personal_nformation/operate_wx';
	// },

	/* code查询微信手机号码 */
	getWxPhone: (code)=>{
		return request(api+'/getwxuserphone?code='+code,'GET',{});
	},

	/* 微信登录 */
	wxlogin:(param)=>{
		return request(api+'/auth/wxlogin','POST',param);
	},

	/*信息确认关联*/
	relation:(param)=>{
		return request(api+'/personal_nformation/relation','POST',param);
	},

	/*获取身份证信息*/
	getUserMeg:()=>{
		return request(api + '/personal_nformation/get','GET',{});
	},

	
	/*获取身份证照片*/
	getUserIdCard:(param)=>{
		return request(api + '/personal_nformation/idcard_image?type=' + param, "GET", {}) ;
	},
	
}

