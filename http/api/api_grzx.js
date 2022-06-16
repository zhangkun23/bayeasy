//财税办理
const {
	request
} = require('../request.js')
const api = '';
//基于业务封装的接口
module.exports = {

	/**
	 * 登录
	 * @param { mobile:'18513136572',captcha:'111111'}  
	 */
	check_operate: (param) => {
		return request(api + '/personal_nformation/my_operate', 'GET', {}, true);
	},


	// get_operate:()=>{
	// 	return request('/gshApi/personal_nformation/operate_wx','GET',{},'arrayBuffer');
	// },

	/* 获取二维码 */
	get_operate: () => {
		return request(api + '/personal_nformation/operate_wx_qrcode', 'GET', {});
  },
  /* 获取运营人员列表 */
	operateList: () => {
		return request(api + '/personal_nformation/operate_list', 'GET', {});
	},

	/* 获取用户姓名 */
	get_user_info: () => {
		return request('/personal_nformation/get', 'GET', {})
	}


}