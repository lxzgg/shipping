const app = getApp()

Page({

  data: {
    list: [],
  },

  onLoad(e) {
    app.api.getLogistics({No: e.id, openid: app.data.openid}).then(res => {
      this.setData({
        list: res.tables['0'].rows,
      })
    })
  },

})
