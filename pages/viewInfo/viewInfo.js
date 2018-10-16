const app = getApp()

Page({

  data: {
    list: [],
  },

  onLoad(e) {
    const code = e.id
    this.setData({code})
    app.api.getLogistics({No: code, openid: app.data.openid}).then(res => {
      console.log(e)
      console.log(res.tables['0'].rows)
      this.setData({
        list: res.tables['0'].rows,
      })
    })
  },

})
