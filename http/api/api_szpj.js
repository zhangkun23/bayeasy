//收支票据
const {
    request
} = require('../request.js')
const api = '';

//基于业务封装的接口
module.exports = {

    /**
     * 获取收入账单发票列表
     */
    get_all_invoices: (param) => {
        return request(api + '/invoice/list', 'GET', {});
    },

    get_invoice_detail: (iid) => {
        return request(api + '/invoice/info?id=' + iid, 'GET', {});
    },
    /**
     * 申请开电子票
     * @param {*} params 
     */
    apply_invoice: (params) => {
        return request('/gshApi/invoice/confirm_invoice', 'POST', params);

    },
    /*查询收货地址*/
    getUserMeg: () => {
        return request(api + '/personal_nformation/mail_address', 'GET', {});
    },

    //手动踢啊家增值发票
    updateHandlInvoice: (param) => {
        return request(api + '/deduct_invoice/submit_deduct_invoice', 'POST', param);
    },
    /*发票类型*/
    getInvoiceType: () => {
        return request(api + '/deduct_invoice/deduct_invoice_type', 'GET', {});
    },

    /*  搜索成本发票 */
    searchBill: (param) => {
        return request(api + '/deduct_invoice/list', 'POST', param);
    },


    // ocr识别pdf与图片
    ocrDeductInvoice: () => {
        return request(api + '/deduct_invoice/ocr_deduct_invoice', 'GET', {});
    },

    // ocr最终提交 返回错误信息
    submitOcrDeductInvoice: (param) => {
        return request(api + '/deduct_invoice/submit_ocr_deduct_invoice', 'POST', param);
    },

    // 删除已ocr识别过的发票文件
    delDeductInvoiceFile: (id) => {
        return request(api + '/deduct_invoice/del_deduct_invoice_file?id='+id, 'GET', {});
    },

    // 获取成本发票详情
    getAcquisitionDetails: (id) => {
        return request(api + '/deduct_invoice/info?id=' + id, 'GET', {});
    }
}