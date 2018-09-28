const app = getApp()

Page({

  send() {
    app.data.type = '寄'
    wx.navigateTo({url: '/pages/addressList/addressList'})
  },

  take() {
    app.data.type = '收'
    wx.navigateTo({url: '/pages/addressList/addressList'})
  },

})
