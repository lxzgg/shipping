const app = getApp()

Page({

  data: {},

  onLoad() {
    app.api.payment_history({openid: app.data.openid, in_pagenumber: 0}).then(res => {
      this.setData({
        list: res.tables['0'].rows,
      })
    })
  },
})
