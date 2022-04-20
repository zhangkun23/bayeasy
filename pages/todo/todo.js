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
        url: '../tax/deatil/deatil?'
      },
      {
        id: 2,
        isShow: false,
        titleYellow: true,
        title: "征期申报税款确认",
        subTitle: "征期已将近，请尽快确认",
        btnText: "去确认",
        url: '../tax/deatil/deatil?'
      },
      {
        id: 3,
        isShow: false,
        titleYellow: true,
        count: 0,
        title: "您有 {0} 条申报欠款记录需要处理",
        subTitle: "为了不影响公司信誉，请尽快结清欠款",
        btnText: "去查看",
        url: "../tax/delinquentBill/index"
      },
      {
        id: 4,
        isShow: false,
        titleYellow: true,
        title: "账单发票信息确认",
        subTitle: "请尽快确认账单发票信息",
        btnText: "去确认",
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
        url: "../tax/delinquentBill/index",
      }
    ]
  },
  /* 按钮跳转 */
  goCheck: function (e) {
    let tid = e.currentTarget.dataset.tid
    const _todo_list = this.data.todo_lists.filter(e => e.id === tid)[0]
    if ('ids' in _todo_list) {
      if (_todo_list['ids'].length > 1) {
        const _ids = _todo_list['ids'].map(i => i.id)
        wx.redirectTo({
          url: _todo_list.url + '?from=todo&showtype=list&ids=' + _ids.join('_'),
        })
      } else if (_todo_list['ids'].length === 1)  {
        console.log("!", _todo_list)
        wx.redirectTo({
          url: _todo_list.detailUrl + '?from=todo&showtype=detail&id=' + _todo_list['ids'][0]['id'],
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
    const test_data = {
      "ret": true,
      "message": "success",
      "data": {
        "invoice": [{
          "id": 36
        },{
          "id": 37
        }],
        "declare": [{
          "id": 36
        }],
        "overdue_declare": [{
          "id": 36
        }],
        "loan": [{
          "id": 36
        }],
        "loan_nums": 3,
        "repayment": [{
          "id": 34
        }],
        "repayment_nums": 5,
        "nums": 2
      },
      "code": 200
    }
    todolist().then(res => {
      res = test_data
      if (res.ret) {
        if (res.data instanceof Object) {
          const _data = res.data
          const _todo_keys = Object.keys(_data)
          const _new_todo_lists = that.data.todo_lists
          if (_todo_keys.includes("invoice") && _data.invoice.length > 0) {
            _new_todo_lists[3].isShow = true
            _new_todo_lists[3]["ids"] = _data["invoice"]
          }
          if (_todo_keys.includes("declare") && _data.declare.length > 0) {
            _new_todo_lists[0].isShow = true
          }
          if (_todo_keys.includes("overdue_declare") && _data.overdue_declare.length > 0) {
            _new_todo_lists[1].isShow = true
          }
          if (_todo_keys.includes("loan") && _data.loan.length > 0) {
            _new_todo_lists[2].isShow = true
            _new_todo_lists[2].count = _data.loadn_nums
            _new_todo_lists[2].title = _new_todo_lists[2].title.format(_data.loan_nums)
          }
          if (_todo_keys.includes("repayment") && _data.repayment.length > 0) {
            _new_todo_lists[4].isShow = true
            _new_todo_lists[4].count = _data.repayment_nums
            _new_todo_lists[4].title = _new_todo_lists[4].title.format(_data.repayment_nums)
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
        background_img: 'https://image.bayeasy.cn/images-data/public/backGround.png'
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