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
  // 获取商事主体年份
  getFullYear() {
    return request(api + '/declare/get_declare_year', 'GET', {});
  },
  // 查看详情更新已读状态
  updateReadStatus(param) {
    return request(api + '/declare_loan/read', 'POST', param);
  },
  // 财务报表内容
  reportForm(param) {
    return request(api + '/financial_statement/report_form', 'POST', param);
  },
  // 获取商事主体季度
  getQuarter() {
    return request(api + '/financial_statement/get_report_time', 'GET', {});
  },
  // 工商年报列表
  annualReportList(param) {
    return request(api + '/annual_report/list', 'POST', param);
  },
  // 工商年报详情
  annualReportInfo(param) {
    return request(api + '/annual_report/info?id=' + param, 'GET', {});
  },
  // 工商年报详情
  annualReportSendEmail(param) {
    return request(api + '/annual_report/send_mail', 'POST', param);
  },


}