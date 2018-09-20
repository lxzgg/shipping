const app = getApp()

Page({
  data: {
    isDefault: false,
    address: ['北京市', '市辖区', '东城区'],
  },

  onLoad(e) {
    this.data.id = e.id
    app.data.address = []
  },

  onShow() {
    const address = app.data.address
    console.log(address)
    if (address.length === 0) return

    let details = this.data.details || ''
    let name = this.data.name || ''
    let phone = this.data.phone || ''
    if (address[3]) details = address[3]
    if (address[4]) name = address[4]
    if (address[5]) phone = address[5]

    this.setData({address: address, details, name, phone})
  },

  addressChange(e) {
    this.setData({address: e.detail.value})
  },

  // 选中默认地址
  radioChange() {
    this.setData({isDefault: !this.data.isDefault})
  },

  // 保存地址
  save() {
    const {name, phone, details} = this.data
    if (!name || !phone || !details) {
      return wx.showToast({title: '请填写完整信息', icon: 'none'})
    }
    const province = this.data.address[0]
    const city = this.data.address[1]
    const area = this.data.address[2]

    if (app.data.type === '寄') {
      app.data.send = {NAME: name, MOBILE: phone, ADDRESS_DETAIL: details, PROVINCE: province, CITY: city, AREA: area}
    } else if (app.data.type === '收') {
      app.data.take = {NAME: name, MOBILE: phone, ADDRESS_DETAIL: details, PROVINCE: province, CITY: city, AREA: area}
    }

    let isDefault = '是'

    // id有值则为修改
    if (this.data.id) {
      // 修改地址
      app.api.editAddress({
        id: this.data.id,
        openid: app.data.openid,
        name,
        phone,
        province,
        city,
        area,
        details,
        isDefault,
        send: app.data.type,
      }).then(res => {
        wx.navigateBack()
      })


    } else {
      // 添加地址
      app.api.addAddress({
        openid: app.data.openid,
        name,
        phone,
        province,
        city,
        area,
        details,
        isDefault,
        send: app.data.type,
      }).then(res => {
        wx.navigateBack()
      })
    }

  },

  // 获取表单信息
  getInput(e) {
    app.common.getInput(this, e)
  },

  // 图片识别
  imgDiscern() {
    wx.chooseImage({
      success: res => {
        app.data.image = res.tempFilePaths[0]
        wx.navigateTo({url: '/pages/image/image'})
      },
    })
  },

  // 识别地址
  discern() {
    if (!this.data.discern) return

    let mark = '，'
    if (!this.data.discern.includes(mark)) {
      mark = ','
    }
    if (!this.data.discern.includes(mark)) {
      return
    }
    const arr = this.data.discern.split(mark)
    let phone = ''
    let address = ''
    let name = ''
    for (let i = 0; i < arr.length; i++) {
      if (/^(0|86|17951)?(13[0-9]|14[579]|15[012356789]|16[56]|17[1235678]|18[0-9]|19[89])\s?[0-9]{4}\s?[0-9]{4}$/.test(arr[i])) phone = arr[i]
      else if (/[省|市|区|县]/.test(arr[i])) address = arr[i]
      else name = arr[i]
    }

    address = resolve(address)

    this.setData({
      name,
      phone,
      address: address || [],
      details: address[3] || '',
    })
  },

  nav() {
    wx.chooseLocation({
      success: res => {
        const address = resolve(res.address)

        this.setData({address: address, details: address[3]})
      },
    })
  },

  selectAddress() {
    app.data.address = this.data.address
    wx.navigateTo({url: `/pages/address/address`})
  },
})

function resolve(address) {
  return address.split(/省|市|区|县/)
}
