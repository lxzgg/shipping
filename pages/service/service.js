const app = getApp()

Page({

  data: {
    tabIndex: 1,
    status: '已签收',
  },

  onLoad() {
    this.getOrderList()
  },

  switch(e) {
    const {index} = e.target.dataset
    if (index === 0) this.data.status = '未签收'
    if (index === 1) this.data.status = '已签收'
    this.setData({tabIndex: index})

    this.getOrderList()
  },

  getOrderList() {
    app.api.orderlist({
      in_openid: app.data.openid,
      in_checktime: 30,
      in_waybillno: '',
      in_signStatus: this.data.status,
    }).then(res => {
      this.setData({
        list: res.tables['0'].rows[0].ID ? res.tables['0'].rows : [],
      })
      if (this.data.tabIndex === 1) {
        this.setData({num1: res.tables['0'].rows[0].ID ? res.tables['0'].rows.length : 0})
      } else {
        this.setData({num0: res.tables['0'].rows[0].ID ? res.tables['0'].rows.length : 0})
      }
    })
  },

  // 扫码
  scan_code() {
    wx.scanCode({
      success: res => {
        wx.navigateTo({url: `/pages/viewInfo/viewInfo?id=${res.result}`})
      },
    })
  },
})
