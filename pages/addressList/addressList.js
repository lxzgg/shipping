const app = getApp()

Page({

  data: {},

  onLoad() {
    wx.setNavigationBarTitle({title: `${app.data.type}件地址簿`})
  },

  onShow() {
    this.getAddress()
  },

  // 获取收获地址
  getAddress() {
    app.api.getAddress({openid: app.data.openid, phone: this.data.phone, send: app.data.type}).then(res => {
      const list = res.tables['0'].rows
      this.setData({list})
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
      send: app.data.type,
    }).then(res => {
      this.getAddress()
    })

  },

  // 选中
  select(e) {
    const {NAME, MOBILE, ADDRESS_DETAIL, PROVINCE, CITY, AREA} = e.currentTarget.dataset.item
    console.log(app.data.type)
    if (app.data.type === '寄') {
      app.data.send = {NAME, MOBILE, ADDRESS_DETAIL, PROVINCE, CITY, AREA}
    } else if (app.data.type === '收') {
      app.data.take = {NAME, MOBILE, ADDRESS_DETAIL, PROVINCE, CITY, AREA}
    }
    wx.navigateBack()
  },

})
