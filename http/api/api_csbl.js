// 个人中心
const {
  request
} = require('../request.js')
const api = '';

//基于业务封装的接口
module.exports = {
  /* 纳税申报列表 */
  declareList: () => {
    return request(api + '/declare/list', 'POST', {});
  },

  /* 纳税申报详情 */
  declareInfo: (param) => {
    return request(api + '/declare/declare_info?id=' + param, 'GET', {});
  },

  /* 确认纳税申报 */
  confirmdeclare: (param) => {
    return request(api + '/declare/confirm_declare' , 'POST', param);
  },


}