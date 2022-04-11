//企业信息
const {
    request
} = require('../request.js')


//基于业务封装的接口
module.exports = {

    /**
     * 获取收入账单发票列表
     */
    get_all_invoices: (param) => {
        return request('/gshApi/invoice/list', 'GET', {});
    },

    get_invoice_detail: (iid) => {
        return request('/gshApi/invoice/info?id=' + iid, 'GET', {});
    },
    /**
     * 申请开电子票
     * @param {*} params 
     */
    apply_invoice: (params) => {
       
        return request('/gshAdmin/se_invoice/apply', 'POST', params);
    },


}