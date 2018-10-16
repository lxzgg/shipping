import utils from './utils/index'
import Map from './utils/bmap-wx.min'

App({
  ...utils,

  map: new Map({ak: 'deAFR33M2fRR5IZ63sq8IAXtPgR6gvrX'}),

  data: {
    type: '',
    send: '',
    take: '',
    address: [],
    appid: 'wx6fd1e3873d3ec044',
    secret: '5754a5235c3a45f4cd20efa03ee8429e',
    openid: '',
    image: '',
  },

  load: Promise.resolve(),

  onLaunch() {
    this.load = new Promise(resolve => {
      wx.login({
        success: (res) => {
          resolve(res)
        },
      })
    }).then(res => {
      return new Promise(resolve => {
        wx.request({
          url: 'https://www.szuem.com:8436/openapi/WXgetOpenidServlet',
          data: {
            appid: this.data.appid,
            secret: this.data.secret,
            js_code: res.code,
            grant_type: 'authorization_code',
          },
          success: (res) => {
            console.log('openid 已获取')
            const data = JSON.parse(res.data.out_msg)
            this.data.openid = data.openid
            resolve(res)
          },
        })
      })
    })
  },

})
