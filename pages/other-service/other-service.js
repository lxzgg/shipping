const app = getApp()

Page({

  data: {
    // 保价
    in_declareinsure: 0,
    // 是否物控
    in_iswaitcontrol: '是',
    // 回单类型
    in_rtnbilltype: '无需返单',
  },

  onLoad() {
    if (app.data.in_iswaitcontrol) {
      this.setData({
        in_declareinsure: app.data.in_declareinsure,
        in_iswaitcontrol: app.data.in_iswaitcontrol,
        in_rtnbilltype: app.data.in_rtnbilltype,
      })
    }
  },

  material_control(e) {
    this.setData({in_iswaitcontrol: e.detail.value})
  },

  signing(e) {
    this.setData({in_rtnbilltype: e.detail.value})
  },

  // 保存
  save() {
    app.data.in_declareinsure = this.data.in_declareinsure
    app.data.in_iswaitcontrol = this.data.in_iswaitcontrol
    app.data.in_rtnbilltype = this.data.in_rtnbilltype
    wx.navigateBack()
  },

  getInput(e) {
    app.common.getInput(this, e)
  },
})
