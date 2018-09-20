const app = getApp()

Page({

  data: {
    goodsName: '日用品',
    payWay: {
      index: 0,
      list: ['现付', '到付'],
    },
    product: {
      index: 0,
      list: ['当日达', '次日达', '隔日达', '特惠卡班'],
    },
    service: {
      index: 0,
      list: ['机场自提', '网点自提', '送货（不含上楼）', '送货上楼'],
    },
    time: [],
    // 当前时间
    currentTime: [app.timestamp(), app.timestamp(Date.now() + 24 * 60 * 60 * 1000), app.timestamp(Date.now() + 2 * 24 * 60 * 60 * 1000)],
    // 当前时间下标
    timeIndex: 0,
    // 件数
    number: 1,
    // 重量
    weight: 1,
    goodsIndex: 1,
  },

  onLoad() {
    new Promise(resolve => {
      wx.login({
        success: (res) => {
          resolve(res)
        },
      })
    }).then(res => {
      return new Promise(resolve => {
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: app.data.appid,
            secret: app.data.secret,
            js_code: res.code,
            grant_type: 'authorization_code',
          },
          success: (res) => {
            app.data.openid = res.data.openid
            resolve(res)
          },
        })
      })
    }).then(res => {
      // app.api.getHotCity({openid: res.data.openid})
      app.api.userlogin({openid: res.data.openid, appid: app.data.appid})
    })
  },

  // 初始化
  onShow() {
    if (app.data.send) {
      this.setData({send: app.data.send})
    }
    if (app.data.take) {
      this.setData({take: app.data.take})
    }
  },

  // 切换时间
  switchTime(e) {
    let {index} = e.currentTarget.dataset
    if (this.data.timeIndex === index) return

    if (index === 0) {
      this.data.time = this.currentTime()
    } else {
      this.data.time = time()
    }

    this.setData({timeSelect: '', timeIndex: index, time: this.data.time})
  },

  // 上门时间
  homeTime() {
    if (this.data.timeIndex === 0) {
      this.data.time = this.currentTime()
    } else {
      this.data.time = time()
    }

    this.setData({
      time: this.data.time,
      homeTime: true,
      fill: true,
    })
  },

  currentTime() {
    let h = Number(app.timestamp('H'))
    if (h % 2 !== 0) --h
    h = h / 2 + 1
    return ['一小时以内'].concat(time().slice(h))
  },

  // 选择时间
  timeSelect(e) {
    const index = Number(e.currentTarget.dataset.index)
    const time = e.currentTarget.dataset.time.split('~')

    this.setData({timeSelect: index})

    const timeIndex = this.data.timeIndex

    let day
    if (timeIndex === 0) {
      day = app.timestamp('YYYY-MM-DD')
    } else if (timeIndex === 1) {
      day = app.timestamp(Date.now() + 24 * 60 * 60 * 1000, 'YYYY-MM-DD')
    } else if (timeIndex === 2) {
      day = app.timestamp(Date.now() + 2 * 24 * 60 * 60 * 1000, 'YYYY-MM-DD')
    }

    let HomeTime = `${day} ${e.currentTarget.dataset.time}`

    // 预约开始时间
    let in_orderstarttime = ''
    // 预约结束时间
    let in_orderendtime = ''

    if (timeIndex === 0 && index === 0) {
      HomeTime = `${e.currentTarget.dataset.time}`
      in_orderstarttime = app.timestamp(Date.now(), 'YYYY-MM-DD HH:mm:ss')
      in_orderendtime = app.timestamp(Date.now() + 60 * 60 * 1000, 'YYYY-MM-DD HH:mm:ss')
    } else {
      in_orderstarttime = app.timestamp(`${day} ${time[0]}`, 'YYYY-MM-DD HH:mm:ss')
      in_orderendtime = app.timestamp(`${day} ${time[1]}`, 'YYYY-MM-DD HH:mm:ss')
    }

    this.data.in_orderstarttime = in_orderstarttime
    this.data.in_orderendtime = in_orderendtime

    this.setData({HomeTime})
    this.fill()
  },

  // 幕布
  fill() {
    this.setData({
      homeTime: false,
      goods: false,
      fill: false,
    })
  },

  // 货物信息
  goods() {
    this.setData({
      goods: true,
      fill: true,
    })
  },

  sendList() {
    app.data.type = '寄'
    wx.navigateTo({url: '/pages/addressList/addressList'})
  },

  takeList() {
    app.data.type = '收'
    wx.navigateTo({url: '/pages/addressList/addressList'})
  },

  // 寄件人信息
  send() {
    app.data.type = '寄'
    wx.navigateTo({url: '/pages/send/send'})
  },

  // 收件人信息
  take() {
    app.data.type = '收'
    wx.navigateTo({url: '/pages/send/send'})
  },

  // 付款方式
  payWay() {
    wx.showActionSheet({
      itemList: this.data.payWay.list,
      success: (res) => {
        this.data.payWay.index = res.tapIndex
        this.setData({
          payWay: this.data.payWay,
        })
      },
    })
  },

  // 产品
  product() {
    wx.showActionSheet({
      itemList: this.data.product.list,
      success: (res) => {
        this.data.product.index = res.tapIndex
        this.setData({
          product: this.data.product,
        })
      },
    })
  },

  // 服务类型
  service() {
    wx.showActionSheet({
      itemList: this.data.service.list,
      success: (res) => {
        this.data.service.index = res.tapIndex
        this.setData({
          service: this.data.service,
        })
      },
    })
  },

  switchGoods(e) {
    const {index, name} = e.target.dataset
    if (index) {
      this.setData({
        goodsIndex: index,
        goodsName: name,
      })
    }
  },

  // 件数增加
  numAdd() {
    this.setData({number: ++this.data.number})
  },

  // 件数减少
  numLess() {
    if (this.data.number <= 1) return
    this.setData({number: --this.data.number})
  },

  // 重量增加
  wAdd() {
    this.setData({weight: ++this.data.weight})
  },

  // 重量减少
  wLess() {
    if (this.data.weight <= 1) return
    this.setData({weight: --this.data.weight})
  },

  getInput(e) {
    app.common.getInput(this, e)
  },

  // 确定
  define() {
    this.fill()
    this.setData({goodsShow: true})
  },
})

function time() {
  let arr = []
  for (let i = 0; i < 24 / 2; i++) {
    arr.push(`${i * 2}:00~${i * 2 + 2}:00`)
  }
  return arr
}
