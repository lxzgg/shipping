const app = getApp()

Page({
  data: {},

  onLoad() {
    app.api.getLogistics({openid: app.data.openid, No: '100346971'}).then(res => {
      console.log(res)
    })
  },
})
