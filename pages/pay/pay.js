const app = getApp()

Page({

  data: {},

  onLoad() {

  },

  btn() {//'600086324'
    //100059549
    app.api.checkpayment({in_openid: app.data.openid, in_waybillno: this.data.number}).then(res => {
      this.setData({
        list: res.rpara,
      })
    })
  },

  pay() {
    app.api.PayState({
      in_openid: app.data.openid,
      in_waybillno: this.data.list[1].value,
      in_time_end: app.timestamp('YYYY-MM-DD HH:mm:ss'),
      in_total_fee: this.data.list[7].value,
      in_PayType: '微信支付',
      in_transaction_id: '',
    }).then(res => {
      wx.showToast({title: res.rpara['0'].value, icon: 'none'})
    })
  },

  getInput(e) {
    app.common.getInput(this, e)
  },

  // 支付记录
  pay_info() {
    wx.navigateTo({url: '/pages/payInfo/payInfo'})
  },
})
