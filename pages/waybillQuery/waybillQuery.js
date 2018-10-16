const app = getApp()

Page({
  data: {
    list: [],
  },

  btn() {
    if (this.data.number.length > 0) this.setData({code: this.data.number})

    app.api.getLogistics({No: this.data.number, openid: app.data.openid}).then(res => {
      this.setData({
        list: res.tables['0'].rows,
      })
    })

  },

  getInput(e) {
    app.common.getInput(this, e)
  },

  // 扫码
  scan_code() {
    wx.scanCode({
      success: res => {
        this.data.number = res.result
        this.setData({code: res.result})
        this.btn()
      },
    })
  },

})
