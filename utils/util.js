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

const openPdf = (url)=>{
  if(url == '') return;
  url = getApp().globalData.pafPath+url+'.pdf'
  console.log(url)
  wx.downloadFile({
    url: url,
    success: function (res) {                           
        console.log(res);
        if (res.statusCode === 200) {                     //成功
          var Path = res.tempFilePath                     //返回的文件临时地址，用于后面打开本地预览所用
          wx.openDocument({
            filePath: Path,                               //要打开的文件路径
            success: function (res) {
              console.log('打开PDF成功');
            }
          })
        }
      },
      fail: function (res) {
        console.log(res);                                  //失败
      }
    })
};

module.exports = {
  formatTime,
  navigateTo,
  openPdf
}
