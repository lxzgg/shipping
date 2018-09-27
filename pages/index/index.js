const app = getApp()

Page({

  data: {
    price: 0,
    goodsName: '',
    itemName: ['电子产品', '服装', '酒类', '鲜活易腐', '物料', '其他'],
    payWay: {
      index: 0,
      list: ['现付', '到付'],
    },
    product: {
      index: 0,
      list: [],
    },
    service: {
      index: 0,
      list: ['机场自提', '网点自提', '送货（不含上楼）', '送货上楼'],
    },
    time: [],
    // 当前时间
    currentTime: [app.timestamp(), app.timestamp(Date.now() + 24 * 60 * 60 * 1000), app.timestamp(Date.now() + 2 * 24 * 60 * 60 * 1000)],
    in_orderstarttime: app.timestamp(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
    in_orderendtime: app.timestamp(Date.now() + 60 * 60 * 1000, 'YYYY-MM-DD HH:mm:ss'),
    // 当前时间下标
    timeIndex: 0,
    // 件数
    number: 1,
    // 重量
    weight: 1,
    goodsIndex: 0,
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
          url: 'https://kd.xiaozhanxiang.com/kd/openapi/WXgetOpenidServlet',
          data: {
            appid: app.data.appid,
            secret: app.data.secret,
            js_code: res.code,
            grant_type: 'authorization_code',
          },
          success: (res) => {
            const data = JSON.parse(res.data.out_msg)
            app.data.openid = data.openid
            resolve(res)
          },
        })
      })
    }).then(res => {
      // app.api.getHotCity({openid: res.data.openid})
      app.api.userlogin({openid: app.data.openid, appid: app.data.appid})
      app.api.getAddress({openid: app.data.openid, send: '寄'}).then(res => {
        const defaultList = res.tables['0'].rows
        for (let i = 0; i < defaultList.length; i++) {
          if (defaultList[i].ISDEFAULT === '是') {
            this.setData({send: defaultList[i]})
            break
          }
        }
      })

      app.api.getAddress({openid: app.data.openid, send: '收'}).then(res => {
        const defaultList = res.tables['0'].rows
        for (let i = 0; i < defaultList.length; i++) {
          if (defaultList[i].ISDEFAULT === '是') {
            this.setData({take: defaultList[i]})
            break
          }
        }
      })

      app.api.getProduct({openid: app.data.openid}).then(res => {
        const list = res.tables['0'].rows
        const arr = []
        for (let i = 0; i < list.length; i++) {
          arr.push(list[i].ITEM_PRODUCTNAME)
        }
        this.data.product.list = arr
        this.setData({
          product: this.data.product,
        })
      })

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

    if (app.data.in_iswaitcontrol) {
      this.setData({
        in_declareinsure: app.data.in_declareinsure,
        in_iswaitcontrol: app.data.in_iswaitcontrol,
        in_rtnbilltype: app.data.in_rtnbilltype,
      })
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
    // if (this.data.send) {
    //   app.data.address = [this.data.send.PROVINCE, this.data.send.CITY, this.data.send.AREA, this.data.send.ADDRESS_DETAIL, this.data.send.NAME, this.data.send.MOBILE]
    // }
    wx.navigateTo({url: '/pages/send/send'})
  },

  // 收件人信息
  take() {
    app.data.type = '收'
    // if (this.data.take) {
    //   app.data.address = [this.data.take.PROVINCE, this.data.take.CITY, this.data.take.AREA, this.data.take.ADDRESS_DETAIL, this.data.take.NAME, this.data.take.MOBILE]
    // }
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
    console.log(e)
    const {index, name} = e.target.dataset
    if (index >= 0) {
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
    this.setData({goodsShow: true, goodsName: this.data.itemName[this.data.goodsIndex]})
  },

  value_added() {
    wx.navigateTo({url: '/pages/other-service/other-service'})
  },

  // 运费估算
  getCost() {
    const send = this.data.send
    const take = this.data.take
    const in_orderstarttime = this.data.in_orderstarttime
    const in_orderendtime = this.data.in_orderendtime
    const in_goodsname = this.data.goodsName
    const in_goodscount = this.data.number
    const in_goodsweight = this.data.weight
    const in_declareinsure = this.data.in_declareinsure
    const in_iswaitcontrol = this.data.in_iswaitcontrol === '是' ? 1 : 0
    const in_rtnbilltype = this.data.in_rtnbilltype
    const in_paymentmethod = this.data.payWay.list[this.data.payWay.index]
    // 产品ID
    const in_productid = ''
    const in_product = this.data.product.list[this.data.product.index]
    // 服务类型ID
    const in_delivertypeid = ''
    const in_delivertypename = this.data.service.list[this.data.service.index]
    // 储运事项
    const in_careful = this.data.message
    // 寄件人地址簿ID
    const in_addrID = ''

    if (!send || !take) {
      return wx.showToast({title: '请完善信息', icon: 'none'})
    }

    app.api.getCost({
      openid: app.data.openid,
      send,
      take,
      in_orderstarttime,
      in_orderendtime,
      in_goodsname,
      in_goodscount,
      in_goodsweight,
      in_declareinsure,
      in_iswaitcontrol,
      in_rtnbilltype,
      in_paymentmethod,
      in_productid,
      in_product,
      in_delivertypeid,
      in_delivertypename,
      in_careful,
      in_addrID,
    }).then(res => {
      this.setData({
        price: res.rpara['0'].value,
      })

    })
  },

  // 下单
  order() {
    const send = this.data.send
    const take = this.data.take
    const in_orderstarttime = this.data.in_orderstarttime
    const in_orderendtime = this.data.in_orderendtime
    const in_goodsname = this.data.goodsName
    const in_goodscount = Number(this.data.number)
    const in_goodsweight = Number(this.data.weight)
    const in_declareinsure = Number(this.data.in_declareinsure)
    const in_iswaitcontrol = this.data.in_iswaitcontrol === '是' ? 1 : 0
    const in_rtnbilltype = this.data.in_rtnbilltype
    const in_paymentmethod = this.data.payWay.list[this.data.payWay.index]
    // 产品ID
    const in_productid = undefined
    const in_product = this.data.product.list[this.data.product.index]
    // 服务类型ID
    const in_delivertypeid = undefined
    const in_delivertypename = this.data.service.list[this.data.service.index]
    // 储运事项
    const in_careful = this.data.message
    // 寄件人地址簿ID
    const in_addrID = undefined

    if (!send || !take) {
      return wx.showToast({title: '请完善信息', icon: 'none'})
    }

    app.api.order({
      openid: app.data.openid,
      send,
      take,
      in_orderstarttime,
      in_orderendtime,
      in_goodsname,
      in_goodscount,
      in_goodsweight,
      in_declareinsure,
      in_iswaitcontrol,
      in_rtnbilltype,
      in_paymentmethod,
      in_productid,
      in_product,
      in_delivertypeid,
      in_delivertypename,
      in_careful,
      in_addrID,
    }).then(res => {
      const result = res.rpara['0'].value
      if (!result) wx.showToast({title: '下单成功!'})
    })
  },
})

function time() {
  let arr = []
  for (let i = 0; i < 24 / 2; i++) {
    arr.push(`${i * 2}:00~${i * 2 + 2}:00`)
  }
  return arr
}
