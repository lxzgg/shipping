const app = getApp()

Page({
  data: {
    list: [],
  },

  btn() {
    app.api.getLogistics({No: this.data.number, openid: app.data.openid}).then(res => {
      this.setData({
        list: res.tables['0'].rows,
      })
    })
  },

  getInput(e) {
    app.common.getInput(this, e)
  },
})
