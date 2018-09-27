import utils from './utils/index'
import Map from './utils/bmap-wx.min'

App({
  ...utils,

  map: new Map({ak: 'UOv7wTII5qmKpz1U4HpZIFX6Z6kHXGoY'}),

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

})
