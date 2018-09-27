const app = getApp()

Page({

  data: {
    tabIndex: 1,
    status: '已签收',
    time: '近一个月',
    itemList: ['近一个月', '近半个月', '近7天', '近3天'],
    itemTime: [30, 15, 7, 3],
    currentTime: 30,
  },

  onLoad() {
    this.getOrderList()
  },

  // 时间
  time() {
    wx.showActionSheet({
      itemList: this.data.itemList,
      success: res => {
        const time = this.data.itemList[res.tapIndex]
        const currentTime = this.data.itemTime[res.tapIndex]
        this.setData({time, currentTime})
        this.getOrderList()
      },
    })
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
      in_checktime: this.data.currentTime,
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
