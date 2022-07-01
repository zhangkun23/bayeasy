const {
    btoa
} = require('./base64')
const {
    prod
} = require('../http/env')

const {
    operateList
} = require("../http/api/api_grzx")

/**
 * 查询运营人员列表
 */
const asgetOperateList = () => {
    operateList().then(res => {
        if (res.ret && res.data && res.data.length > 0) {
            getApp().globalData.currentOperation = res.data;
        }
    })
}

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

const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
// 补0
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : `0${n}`
}

// 路由
const navigateTo = (path) => {
    wx.navigateTo({
        url: path,
    })
}

// 保存图片至手机相册
const saveImgToAlbum = (content) => {
    let saveImg = function () {
        let _pureData;
        if (content.startsWith('data:image/png;base64,')) {
            _pureData = content.slice(22)
        } else if (content.startsWith('data:image/jpeg;base64,')) {
            _pureData = content.slice(23)
        } else {
            return
        }
        const fileManager = wx.getFileSystemManager();
        fileManager.writeFile({
            filePath: wx.env.USER_DATA_PATH + '/tempBase64Png.png',
            data: _pureData,
            encoding: 'base64',
            success: res => {
                console.log("保存临时图片成功: ", res)
                wx.saveImageToPhotosAlbum({
                    filePath: wx.env.USER_DATA_PATH + '/tempBase64Png.png',
                    success(res) {
                        console.log("保存文件成功: ", res)
                        wx.showModal({
                            title: "保存成功",
                            content: "已保存至您的手机相册，请查收！",
                            confirmText: '知道了',
                            showCancel: false,
                        })
                    }
                })
            },
            fail: err => {
                console.error("保存临时图片失败: ", err)
            }
        })
    }
    let auth = new Promise(function (resolve, reject) {
        wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: res => {
                console.log("成功获取相册权限: ", res)
                resolve(res)
            },
            fail: error => {
                console.log("用户拒绝相册请求: ", error)
                reject(error)
            }
        })
    })
    auth.then(res => {
        saveImg(content)
    }).catch(error => {
        console.log("保存失败: ", error)
        wx.showModal({
            title: "提示",
            content: "请重新打开相册权限，方便存入图片",
            success: res => {
                if (res.confirm) {
                    wx.openSetting({
                        success: res => {
                            console.log("open setting success :", res)
                        }
                    })
                }
            }
        })
    })
}
// 打开pdf文件
const openPdf = (url) => {
    console.log(url)
    let fileName
    if (url === 'service_agreement') {
        fileName = '平台服务协议'
    } else if (url === 'privacy_policy') {
        fileName = '隐私政策'
    } else {
        fileName = url
    }
    const app = getApp()
    if (!url) {
        console.error("Wrong url passed to pdf : ", url)
        return
    }
    // 拼接的时候如果有 .pdf 结尾就是拼接域名+文件名+手动拼接.pdf，其他情况直接取线上地址拼接文件路径（成本发票详情）
    if (!url.endsWith('.pdf')) {
        url = app.globalData.pdfPath + url + '.pdf'
    } else {
        url = prod + url
    }
    // 保存后的文件名
    if (!fileName.endsWith('.pdf')) {
        fileName = fileName + '.pdf'
    }
    wx.downloadFile({
        url: url,
        filePath: wx.env.USER_DATA_PATH + "/" + fileName,
        success: function (res) {
            if (res.statusCode === 200) { //成功
                let Path
                if ('filePath' in res) {
                    Path = res.filePath
                } else if ('tempFilePath' in res) {
                    Path = res.tempFilePath
                } else {
                    Path = wx.env.USER_DATA_PATH + "/" + fileName
                }
                // let Path = res.filePath
                wx.openDocument({
                    filePath: Path,
                    success: res => {
                        console.log("打开pdf成功")
                    },
                    fail: err => {
                        console.error("打开pdf失败: ", err)
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

const jumpUrl = function (userStatus) {
    if (userStatus == 0) {
        this.navigateTo('/pages/login/authentication/index')
    } else if (userStatus == 1) {
        this.navigateTo('/pages/login/securityCheck/index')
    } else if (userStatus == 2) {
        this.navigateTo('/pages/login/information/index')
    }
}
const dateToStr = function (mydate, formatter = '%Y-%m-%d %H:%M:%S') {
    formatter = formatter.replace('%Y', '{0}')
    formatter = formatter.replace('%m', '{1}')
    formatter = formatter.replace('%d', '{2}')
    formatter = formatter.replace('%H', '{3}')
    formatter = formatter.replace('%M', '{4}')
    formatter = formatter.replace('%S', '{5}')
    const year = mydate.getFullYear()
    let month = mydate.getMonth() + 1
    // 5->05
    if (1 <= month <= 9) {
        month = "0" + month
    }
    const day = mydate.getDate()
    const hour = mydate.getHours()
    const minute = mydate.getMinutes()
    const second = mydate.getSeconds()
    formatter = formatter.format(year, month, day, hour, minute, second)
    return formatter
}
module.exports = {
    arrayBufferToBase64Img,
    formatTime,
    navigateTo,
    openPdf,
    getTabBarIndex,
    Base64Binary,
    nullToEmptyString,
    jumpUrl,
    saveImgToAlbum,
    asgetOperateList
}