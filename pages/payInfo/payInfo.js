const app = getApp()

Page({

  data: {
    page: 0,
    list: [],
  },

  onLoad() {
    this.getPayment_history()
  },

  onReachBottom() {
    ++this.data.page
    this.getPayment_history()
  },


  getPayment_history() {
    app.api.payment_history({openid: app.data.openid, in_pagenumber: this.data.page}).then(res => {
      this.setData({
        list: this.data.list.concat(res.tables['0'].rows),
      })
    })
  },

})
