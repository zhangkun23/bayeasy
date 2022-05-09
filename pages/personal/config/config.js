const tempPath = getApp().globalData.imgPath;
const config = {
  icons_url: {
    right_arrow: tempPath + 'personal/btns/right-arrow.png',
    contact_operate: tempPath + 'personal/icons/contact-service.png',
    about_bayeasy: tempPath + 'personal/icons/about-bayeasy.png',
    feed_back: tempPath + 'personal/icons/feedback.png'
  },
  btns_url: {
    personal: tempPath + 'personal/gates/person-info.png',
    incomeList: tempPath + 'personal/gates/my-sign.png',
    costBill: tempPath + 'personal/gates/check-ticket.png',
    todoList: tempPath + 'personal/gates/todo.png',
  },
  defaultAvatar: tempPath + 'personal/default-avatar.png'
}
module.exports = config