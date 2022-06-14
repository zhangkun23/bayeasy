//通用接口
const {
	request
} = require('../request.js')
//基于业务封装的接口
const api = '';
module.exports = {
	/**
	 * 登录
	 * @param { mobile:'18513136572',captcha:'111111'}  
	 */
	login: (param) => {
		return request(api + '/auth/login', 'POST', param);
	},

	/**
	 * 发送验证码
	 * @param { mobile:'18513136572'}  
	 */
	captcha: (param) => {
		return request(api + '/auth/login/captcha', 'POST', param);
	},

	/* 退出登录 */
	logout: () => {
		return request(api + '/auth/logout', 'post', {});
	},

	/* 查询代办事项 */
	todolist: () => {
		return request(api + '/personal_nformation/todolist', 'GET', {});
	},

	/* 用户关联状态 */
	getUserStatus: () => {
		return request(api + '/personal_nformation/bayeasy_user_status', 'GET', {});
	},

	/* 是否有所属运营人员 */
	myOperate: () => {
		return request(api + '/personal_nformation/my_operate', 'GET', {});
	},

	/* 个人身份信息_身份证照片提交ocr识别 */
	IdCardOCR: () => {
		return request(api + '/personal_nformation/ocr_idcard', 'POST', {});
	},

	/* 个人身份信息_身份证信息提交 */
	IDcardSubmit: (param) => {
		return request(api + '/personal_nformation/submit', 'POST', param);
	},

	/* 个人身份信息_身份证信息验证 */
	IdcardAuthentication: (param) => {
		return request(api + '/personal_nformation/authentication', 'POST', param);
	},

	/* 获取客服专员二维码 */
	// getOperateQR: ()=>{
	// 	return api+'/personal_nformation/operate_wx';
	// },

	/* code查询微信手机号码 */
	getWxPhone: (code) => {
		return request(api + '/getwxuserphone?code=' + code, 'GET', {});
	},

	/* 微信登录 */
	wxlogin: (param) => {
		return request(api + '/auth/wxlogin', 'POST', param);
	},

	/* 信息确认关联 */
	relation: (param) => {
		return request(api + '/personal_nformation/relation', 'POST', param);
	},

	/* 获取身份证信息 */
	getUserMeg: () => {
		return request(api + '/personal_nformation/get', 'GET', {});
	},

	/* 获取身份证照片 */
	getUserIdCard: (param) => {
		return request(api + '/personal_nformation/idcard_image?type=' + param, "GET", {});
	},
	/* 获取常见问题列表 */
	commonProblemList: (param) => {
		return request(api + '/common_problem/list', "POST", param);
	},

	/* 获取是否有留言记录接口 */
	feedbackStatus: () => {
		return request(api + '/feedback/status', "GET", {});
	},

	/* 获取是否有提交问题反馈接口 */
	feedbackList: (param) => {
		return request(api + '/feedback/list', "POST", param);
	},
	/* 提交反馈 */
	feedbackSubmit: (param) => {
		return request(api + '/feedback/submit', "POST", param);
	},

	/* 服务费用列表 */
	getPayList: (param) => {
		return request(api + '/service_charge/list', "POST", param);
	},
	/* 获取服务费详情 */
	serviceFeeDeatail: (param) => {
		return request(api + '/service_charge/info?id=' + param, "GET",);
	},
	/* 获取支付方式 */
	getPayType: () => {
		return request(api + '/service_charge/pay_type', "GET", {});
	},
	/* 获取银行信息 */
	getBankInfo: () => {
		return request(api + '/service_charge/bank_info', "GET", {});
	},

	/* 微信支付提交预订单支付吊起微信支付控件  */ 
	wechatPay: (param) => {
		return request('/wechat_pay/pre_pay', "POST", param);
	},
	/* 确认支付 */
	// wechatPayData: (param) => {
	// 	return request('/wechat_pay/pay_data', "POST", param);
	// },
	// 获取银行信息
	getBankInfo: () => {
		return request(api + '/service_charge/bank_info', "GET", {});
	},
	//  获取支付宝跳转
	alipayUrl: (param) => {
		return request(api + '/alipay/service/url', "POST", param);
	},



}