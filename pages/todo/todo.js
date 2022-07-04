// pages/todo/todo.js
const app = getApp()
const {
  todolist
} = require('../../http/api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    empty_bg_url: app.globalData.emptyPic,
    config: {
      canvasSize: {
        width: 196 * 2,
        height: 196 * 2
      },
      percent: 100,
      barStyle: [{
        width: 60,
        fillStyle: '#e7edf6',
        lineCap: 'round'
      }, {
        width: 60,
        animate: true,
        fillStyle: [{
          position: 0,
          color: '#5f9afc'
        }, {
          position: 1,
          color: '#5f9afc'
        }]
      }]
    },
    todo_lists: [{
        id: 1,
        isShow: false,
        titleYellow: true,
        title: "征期申报税款确认",
        subTitle: "请您尽快确认税额，以免影响申报进度",
        btnText: "去确认",
        btnBgColor: "#1D83F0",
        url: '/pages/tax/deatil/deatil',
        detailUrl: '/pages/tax/deatil/deatil',
      },
      {
        id: 2,
        isShow: false,
        titleYellow: true,
        title: "征期申报税款确认",
        subTitle: "征期已将近，请尽快确认",
        btnText: "去确认",
        btnBgColor: "#1D83F0",
        url: '/pages/tax/deatil/deatil',
        detailUrl: '/pages/tax/deatil/deatil',
      },
      {
        id: 3,
        isShow: false,
        titleYellow: true,
        count: 0,
        title: "您有 {0} 条申报欠款记录需要处理",
        subTitle: "为了不影响公司信誉，请尽快结清欠款",
        btnText: "去查看",
        btnBgColor: "#1D83F0",
        url: "/pages/tax/delinquentBill/index",
        detailUrl: "/pages/tax/billingDetail/billingDetail",
      },
      {
        id: 4,
        isShow: false,
        titleYellow: true,
        title: "账单发票信息确认",
        subTitle: "请尽快确认账单发票信息",
        btnText: "去确认",
        btnBgColor: "#1D83F0",
        url: "../invoice/incomeInvoice/index/index",
        detailUrl: "../invoice/incomeInvoice/details/index",
      },
      {
        id: 5,
        isShow: false,
        titleYellow: false,
        count: 0,
        title: "您有 {0} 条申报欠款已结清",
        subTitle: "请尽快查看核实信息是否有误",
        btnText: "去查看",
        btnBgColor: "#1D83F0",
        url: "/pages/tax/repaymentBill/index",
        detailUrl: "/pages/tax/billingDetail/billingDetail",
      },
      {
        id: 6,
        isShow: false,
        titleYellow: true,
        count: 0,
        title: "服务费支付结算",
        subTitle: "请尽快支付结算服务费",
        btnText: "去支付",
        btnBgColor: "#FFA42E",
        url: "/pages/serviceFee/index/index",
        detailUrl: "/pages/serviceFee/details/index",
      },
      {
        id: 7,
        isShow: false,
        titleYellow: false,
        count: 0,
        title: "工商年报公示通知",
        subTitle: "工商年报公示信息请查看",
        btnText: "去查看",
        btnBgColor: "#FFA42E",
        url: "/pages/tax/businessAnnualReport/list/list",
        detailUrl: "/pages/tax/businessAnnualReport/detail/detail",
      }
    ]
  },
  /* 按钮跳转 */
  goCheck: function (e) {
    console.log(e)
    let tid = e.currentTarget.dataset.tid;
    const _todo_list = this.data.todo_lists.filter(e => e.id === tid)[0]
    console.log(_todo_list)
    if ('ids' in _todo_list) {
      if (_todo_list['ids'].length > 1) {
        if (!('detailUrl' in _todo_list)) {
          return
        }
        const _ids = _todo_list['ids'].map(i => i.id)
        wx.navigateTo({
          url: _todo_list.url + '?type=todo&ids=' + _ids.join('_'),
        })
      } else if (_todo_list['ids'].length === 1) {
        wx.navigateTo({
          url: _todo_list.detailUrl + '?type=todo&id=' + _todo_list['ids'][0]['id'],
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!String.prototype.format) {
      String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
          return typeof args[number] != 'undefined' ?
            args[number] :
            match;
        });
      };
    }
    var that = this
    todolist().then(res => {
      if (res.ret) {
        if (res.data instanceof Object) {
          const _data = res.data
          const _todo_keys = Object.keys(_data)
          const _new_todo_lists = that.data.todo_lists
          // 待办账单发票信息
          if (_todo_keys.includes("invoice")) {
            if (_data.invoice.length > 0) {
              _new_todo_lists[3].isShow = true
              _new_todo_lists[3]["ids"] = _data["invoice"]
            } else {
              _new_todo_lists[3].isShow = false
              delete _new_todo_lists[3]["ids"]
            }
          }
          // 正常待确认申报税款
          if (_todo_keys.includes("declare")) {
            if (_data.declare.length > 0) {
              _new_todo_lists[0].isShow = true
              _new_todo_lists[0]["ids"] = _data["declare"]
            } else {
              _new_todo_lists[0].isShow = false
              delete _new_todo_lists[0]["ids"]
            }
          }
          // 即将逾期待确认申报税款
          if (_todo_keys.includes("overdue_declare")) {
            if (_data.overdue_declare.length > 0) {
              _new_todo_lists[1].isShow = true
              _new_todo_lists[1]["ids"] = _data["overdue_declare"]
            } else {
              _new_todo_lists[1].isShow = false
              delete _new_todo_lists[1]["ids"]
            }
          }
          // 欠款账单
          if (_todo_keys.includes("loan")) {
            if (_data.loan.length > 0) {
              _new_todo_lists[2].isShow = true
              _new_todo_lists[2].count = _data.loadn_nums
              _new_todo_lists[2].title = _new_todo_lists[2].title.format(_data.loan_nums)
              _new_todo_lists[2]["ids"] = _data["loan"]
            } else {
              _new_todo_lists[2].isShow = false
              _new_todo_lists[2].title = "您有 {0} 条申报欠款记录需要处理";
              delete _new_todo_lists[2]["ids"];
            }
          }
          // 还款账单
          if (_todo_keys.includes("repayment")) {
            if (_data.repayment.length > 0) {
              _new_todo_lists[4].isShow = true
              _new_todo_lists[4].count = _data.repayment_nums
              _new_todo_lists[4].title = _new_todo_lists[4].title.format(_data.repayment_nums)
              _new_todo_lists[4]["ids"] = _data["repayment"]
            } else {
              _new_todo_lists[4].isShow = false
              _new_todo_lists[4].title = "您有 {0} 条申报欠款记录需要处理";
              delete _new_todo_lists[4]["ids"];
            }
          }
          console.log(_todo_keys)
          // 支付费用
          // detailUrl: "/pages/serviceFee/details/index",
          if(_todo_keys.includes("service_charge")) {
            if(_data.service_charge.length > 0) {
              _new_todo_lists[5].isShow = true;
              _new_todo_lists[5]["ids"] = _data["service_charge"]
            } else {
              _new_todo_lists[5].isShow = false;
              delete _new_todo_lists[5]["ids"];
            }
          }

          // 工商年报
          if(_todo_keys.includes('annual_report')) {
            if(_data.annual_report.length > 0) {
              _new_todo_lists[6].isShow = true;
              _new_todo_lists[6]["ids"] = _data["annual_report"]
            } else {
              _new_todo_lists[6].isShow = false;
              delete _new_todo_lists[6]["ids"];
            }
          }

          that.setData({
            todo_lists: _new_todo_lists,
            count: _data.nums
          })
          app.globalData.todolistNum = _data.nums
        }
      }
    })
    if (this.data.count !== 0) {
      this.setData({
        background_img: app.globalData.imgPath + 'public/backGround.png'
      })
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.debug('更新待办事项')
    this.onShow();
    wx.stopPullDownRefresh();
  },
  /*
   * 处理返回 除非从个人中心来的统统返回首页
   */
  handleBackArrow: function () {
    let pages = getCurrentPages(); //页面对象
    let prevpage = pages[pages.length - 2]; //上一个页面对象
    let path = prevpage.route;
    if (path !== 'pages/personal/personalIndex/index') {
      wx.switchTab({
        url: '../index/index',
      })
    } else {
      wx.switchTab({
        url: '../personal/personalIndex/index',
      })
    }
  }
})