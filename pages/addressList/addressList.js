const app = getApp()

Page({

  data: {},

  onLoad(e) {
    const type = e.type || app.data.type
    app.data.type = type
    wx.setNavigationBarTitle({title: `${type}件地址簿`})
    this.setData({type: type})
  },

  onShow() {
    console.log(this.data.type)
    this.getAddress()
  },

  // 获取收获地址
  getAddress() {
    wx.showLoading({title: '请稍后~', mask: true})
    app.load.then(res => {
      console.log('开始获取地址')
      app.api.getAddress({openid: app.data.openid, phone: this.data.phone, send: this.data.type}).then(res => {

        const result = res.rpara['0'].value
        if (result) {
          return wx.showToast({title: result, icon: 'none'})
        }

        const list = res.tables['0'].rows
        this.setData({list})
        wx.hideLoading()
        console.log('地址获取完毕')
      })
    })
  },

  // 删除
  del(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确定删除该地址?',
      success: res => {

        if (res.cancel) return

        app.api.delAddress({openid: app.data.openid, id}).then(res => {
          console.log(res)
          this.getAddress()
        })

      },
    })
  },

  // 编辑
  edit(e) {
    const item = e.currentTarget.dataset.item
    console.log(item)
    app.data.address = [item.PROVINCE, item.CITY, item.AREA, item.ADDRESS_DETAIL, item.NAME, item.MOBILE]
    wx.navigateTo({url: `/pages/send/send?id=${item.ID}`})
  },

  // 默认地址
  default(e) {
    const item = e.currentTarget.dataset.item
    console.log(item)

    // 修改地址
    app.api.editAddress({
      id: item.ID,
      openid: app.data.openid,
      name: item.NAME,
      phone: item.MOBILE,
      province: item.PROVINCE,
      city: item.CITY,
      area: item.AREA,
      details: item.ADDRESS_DETAIL,
      isDefault: '是',
      send: this.data.type,
    }).then(res => {
      this.getAddress()
    })

  },

  // 选中
  select(e) {
    const {NAME, MOBILE, ADDRESS_DETAIL, PROVINCE, CITY, AREA} = e.currentTarget.dataset.item

    if (this.data.type === '寄') {
      app.data.send = {NAME, MOBILE, ADDRESS_DETAIL, PROVINCE, CITY, AREA}
    } else if (this.data.type === '收') {
      app.data.take = {NAME, MOBILE, ADDRESS_DETAIL, PROVINCE, CITY, AREA}
    }
    wx.navigateBack()
  },

})
