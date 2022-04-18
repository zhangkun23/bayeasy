// 个人中心
const {
  request
} = require('../request.js')
const api = '';

//基于业务封装的接口
module.exports = {
  /* 纳税申报列表 */
  declareList: (param) => {
    return request(api + '/declare/list', 'POST', param);
  },

  /* 纳税申报详情 */
  declareInfo: (param) => {
    return request(api + '/declare/declare_info?id=' + param, 'GET', {});
  },

  /* 确认纳税申报 */
  confirmdeclare: (param) => {
    return request(api + '/declare/confirm_declare', 'POST', param);
  },

  /* 欠款列表 */
  loanList: (param) => {
    return request(api + '/declare_loan/loan_list', 'POST', param);
  },
  /* 还款列表 */
  repaymentList: (param) => {
    return request(api + '/declare_loan/repayment_list', 'POST', param);
  },
  /* 欠款还款详情 */
  declareLoanInfo: (param) => {
    return request(api + '/declare_loan/info?id=' + param, 'GET', {});
  },
  /* 获取欠款还款凭证 */
  getVoucher: (param) => {
    return request(api + '/declare_loan/get_voucher?id=' + param, 'GET', {});
  },


}