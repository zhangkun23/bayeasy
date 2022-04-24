const {
  btoa,
  atob
} = require('./base64')
const {
  prod
} = require('../http/env')
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const navigateTo = (path) => {
  wx.navigateTo({
    url: path,
  })
}

const openPdf = (url) => {
  const app = getApp()
  // if (url == '') return;
  if (!url) {
    console.error("Wrong url passed to pdf : ", url)
    // wx.showToast({
    //   title: '无法打开url',
    //   icon: 'none'
    // })
    return
  }
  // 拼接的时候如果有 .pdf 结尾就是拼接域名+文件名+手动拼接.pdf， 其他情况直接取线上地址拼接文件路径（成本发票详情）
  if (!url.endsWith('.pdf')) {
    url = app.globalData.pafPath + url + '.pdf'
  } else {
    url = prod + url
  }
  // console.log(url)
  //   wx.showToast({
  //     title: url,
  //     icon: 'success',
  //     duration: 2000
  // })
  wx.downloadFile({
    url: url,
    success: function (res) {
      // wx.showToast({
      //   title: res.tempFilePath,
      //   icon: 'success',
      //   duration: 4000
      // })
      console.log(res);
      if (res.statusCode === 200) { //成功
        var Path = res.tempFilePath //返回的文件临时地址，用于后面打开本地预览所用
        wx.openDocument({
          filePath: Path, //要打开的文件路径
          success: function (res) {
            console.log('打开PDF成功');
          }
        })
      }
    },
    fail: function (res) {
      console.log(res); //失败
    }
  })
};

const arrayBufferToBase64Img = function (buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
}
/**
 * 设置低栏
 * @param {*} that 上下文
 * @param {*} index 低栏索引
 */
const getTabBarIndex = function (that, index) {
  if (typeof that.getTabBar === 'function' &&
    that.getTabBar()) {
    that.getTabBar().setData({
      selected: index
    })
  }
}
const Base64Binary = {
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  /* will return a  Uint8Array type */
  decodeArrayBuffer: function (input) {
    var bytes = (input.length / 4) * 3;
    var ab = new ArrayBuffer(bytes);
    this.decode(input, ab);

    return ab;
  },

  removePaddingChars: function (input) {
    var lkey = this._keyStr.indexOf(input.charAt(input.length - 1));
    if (lkey == 64) {
      return input.substring(0, input.length - 1);
    }
    return input;
  },

  decode: function (input, arrayBuffer) {
    //get last chars to see if are valid
    input = this.removePaddingChars(input);
    input = this.removePaddingChars(input);

    var bytes = parseInt((input.length / 4) * 3, 10);

    var uarray;
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    var j = 0;

    if (arrayBuffer)
      uarray = new Uint8Array(arrayBuffer);
    else
      uarray = new Uint8Array(bytes);

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    for (i = 0; i < bytes; i += 3) {
      //get the 3 octects in 4 ascii chars
      enc1 = this._keyStr.indexOf(input.charAt(j++));
      enc2 = this._keyStr.indexOf(input.charAt(j++));
      enc3 = this._keyStr.indexOf(input.charAt(j++));
      enc4 = this._keyStr.indexOf(input.charAt(j++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      uarray[i] = chr1;
      if (enc3 != 64) uarray[i + 1] = chr2;
      if (enc4 != 64) uarray[i + 2] = chr3;
    }

    return uarray;
  },
}

const nullToEmptyString = function (obj) {
  if (obj instanceof Array) {
    if (!obj.includes(null)) {
      return obj;
    }
    return obj.map(o => o === null ? "" : o)
  } else if (obj instanceof Object) {
    for (let key in obj) {
      if (obj[key] === null) {
        obj[key] = ''
      }
    }
  } else if (obj === null) {
    obj = ''
  }
  return obj
}

const jumpUrl = function(userStatus){
  if(userStatus == 0){
    this.navigateTo('/pages/login/authentication/index')
  }else if(userStatus == 1){
    this.navigateTo('/pages/login/securityCheck/index')
  }else if(userStatus==2){
    this.navigateTo('/pages/login/information/index')
  }
}
module.exports = {
  arrayBufferToBase64Img,
  formatTime,
  navigateTo,
  openPdf,
  getTabBarIndex,
  Base64Binary,
  nullToEmptyString,
  jumpUrl
}