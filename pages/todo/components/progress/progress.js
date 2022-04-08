Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    max: { //百分比 通过此值转换成step
      type: String,
      value: '5'
    },
    count: { //百分比 通过此值转换成step
      type: String,
      value: '5',
      observer: function(c){
        console.log("~!!!!!!!!!!!!!")
        this.setData({
          per: c/this.properties.max,
          count: c
        })
        this.drawAll()
      }
    },
    size: {
      type: String,
      value: '196'
    }
  },

  data: {
    /*  私有数据，可用于模版渲染 */
    xs: 0,
    per: 0.5,
    w: 35, //圆的宽度 
    r: 108 //圆的半径
  },
  methods: {
    drawAll: function(){
      this.createSelectorQuery()
      .select('#ctxbg')
      .fields({
        node: true,
        size: true,
      }).exec(this.drawCircleBg.bind(this))

    if (this.data.per !== '0') {
      this.createSelectorQuery()
        .select('#ctx')
        .fields({
          node: true,
          size: true,
        }).exec(this.drawCircle.bind(this))
    }
    },

    /**
     * el:画圆的元素
     * r:圆的半径
     * w:圆的宽度
     * 功能:画背景
     */
    drawCircleBg: function (ctx_lists) {
      const canvas_width = ctx_lists[0].width
      const canvas_height = ctx_lists[0].height
      const canvas = ctx_lists[0].node
      const ctx = canvas.getContext('2d')
      const w = this.data.w
      const r = this.data.r
      this.setData({
        r: r
      })
      canvas.width = canvas_width
      canvas.height = canvas_height
      const xs = this.data.xs;
      ctx.lineWidth = w * xs; // 设置圆环的宽度
      ctx.strokeStyle = '#e7edf6'; // 设置圆环的颜色
      ctx.lineCap = 'round'; // 设置圆环端点的形状
      ctx.beginPath(); //开始一个新的路径
      ctx.arc(canvas_width / 2, canvas_width / 2, (r - w) * xs, 0, 2 * Math.PI, false);
      //设置一个原点(110,110)，半径为100的圆的路径到当前路径
      ctx.stroke(); //对当前路径进行描边
      // ctx.draw();
    },
    /**
     * el:画圆的元素
     * r:圆的半径
     * w:圆的宽度
     * step:圆的弧度 (0-2)
     * 功能:彩色圆环
     */
    drawCircle: function (ctx_lists) {
      const canvas_width = ctx_lists[0].width
      const canvas_height = ctx_lists[0].height
      const canvas = ctx_lists[0].node
      const context = canvas.getContext('2d')
      const w = this.data.w
      const r = this.data.r
      canvas.width = canvas_width
      canvas.height = canvas_height
      const xs = this.data.xs;
      context.strokeStyle = '#609BFC';
      context.lineWidth = w * xs;
      context.lineCap = 'round';
      context.beginPath(); //开始一个新的路径
      // step 从0到2为一周
      context.arc(canvas_width / 2, canvas_width / 2, (r - w) * xs, -Math.PI / 2, -this.data.per * 2 * Math.PI - Math.PI / 2, true);
      context.stroke(); //对当前路径进行描边
    }

  },

  pageLifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    show: function () {
      console.error(this.properties)
      const _this = this;
      //获取屏幕宽度
      wx.getSystemInfo({
        success: function (res) {
          const xs = res.windowWidth / 750
          _this.setData({
            xs: xs
          })
          _this.setData({
            size: _this.properties.size * xs
          });
        },
      });
      // 计算进度
      console.debug(this.properties.count)
      console.debug(this.properties.max)

      console.debug("per is ", this.properties.count / this.properties.max)
      this.setData({
        per: this.properties.count / this.properties.max
      })
      this.drawAll()
      
      // this.createSelectorQuery()
      //   .select('#ctxbg')
      //   .fields({
      //     node: true,
      //     size: true,
      //   }).exec(this.drawCircleBg.bind(this))

      // if (this.data.per !== '0') {
      //   this.createSelectorQuery()
      //     .select('#ctx')
      //     .fields({
      //       node: true,
      //       size: true,
      //     }).exec(this.drawCircle.bind(this))
      // }
    }
  },
  //  observers: {
  //    'count': function(c){
  //      this.setData({
  //        per: c/this.properties.max,
  //        count: c
  //      })
  //    }
  //  }
})