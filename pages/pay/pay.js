const app = getApp()

Page({

  data: {},

  onLoad() {

  },

  btn() {//'600086324'
    //100059549
    app.api.checkpayment({in_openid: app.data.openid, in_waybillno: this.data.number}).then(res => {
      if (!res.rpara[0].value) {
        return wx.showToast({title: res.rpara[9].value, icon: 'none'})
      }
      this.setData({
        list: res.rpara,
        isPay: Number(res.rpara[8].value) > 0,
      })
    })
  },

  pay() {
    wx.showLoading({title: '请稍后~', mask: true})
    if (!this.data.list[7].value && !this.data.list[1].value) return

    let param = {
      // 小程序ID
      appid: 'wx6fd1e3873d3ec044',
      // 商户号
      // mch_id: config.mch_id,
      // 随机字符串
      nonce_str: randomStringing(),
      // 商品描述
      body: '快递费',
      // 订单号
      out_trade_no: randomStringing(),
      // 标价金额
      total_fee: Number(this.data.list[8].value) * 100,
      // 终端IP
      spbill_create_ip: '123.12.12.123',
      // 通知地址
      notify_url: 'http://127.0.0.1',
      // 交易类型
      trade_type: 'JSAPI',
      // 用户标识
      openid: app.data.openid,
    }

    const pay = new Promise(resolve => {
      wx.request({
        url: 'https://www.szuem.com:8436/openapi/WXgetPayResultServlet',
        data: param,
        success: res => {
          wx.requestPayment({
            timeStamp: String(res.data.timeStamp),
            nonceStr: res.data.nonceStr,
            package: res.data.package,
            signType: res.data.signType,
            paySign: res.data.paySign,
            success: res => {
              resolve()
            },
            fail: res => {
              wx.hideLoading()
            },
          })
        },
      })
    })

    pay.then(() => {
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
    })

  },

  getInput(e) {
    app.common.getInput(this, e)
  },

  // 支付记录
  pay_info() {
    wx.navigateTo({url: '/pages/payInfo/payInfo'})
  },

  // 扫码
  scan_code() {
    wx.scanCode({
      success: res => {
        this.data.number = res.result
        this.btn()
      },
    })
  },

})

//生成随机字符串
function randomStringing(len = 32) {
  const data = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const strLength = data.length
  let str = ''
  for (let i = 0; i < len; i++) {
    str += data.charAt(Math.floor(Math.random() * strLength))
  }
  return str
}
