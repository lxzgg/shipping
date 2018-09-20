Page({

  data: {
    // 保价
    in_declareinsure: 0,
    // 是否物控
    in_iswaitcontrol: '是',
    // 回单类型
    in_rtnbilltype: '无需返单',
  },

  load() {

  },

  material_control(e) {
    this.setData({in_iswaitcontrol: e.detail.value})
  },

  signing(e) {
    this.setData({in_rtnbilltype: e.detail.value})
  },

})
