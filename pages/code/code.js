const app = getApp()

Page({

  data: {
    code: '',
  },

  onLoad() {
    this.getCode()
  },

  getCode() {
    app.api.binding_info({
      in_openid: app.data.openid,
      in_appid: app.data.appid,
      out_account: '',
      out_name: '',
    }).then(res => {
      this.setData({
        name: res.rpara[0].value,
        code: res.rpara[1].value,
      })
    })
  },

  getInput(e) {
    app.common.getInput(this, e)
  },

  btn() {
    const code = this.data.number
    const name = this.data.name

    if (!code || !name) return wx.showToast({title: '请输入客户编码和名称', icon: 'none'})

    app.api.app_binding({
      in_type: '绑定', in_account: code, in_name: name, in_openid: app.data.openid, in_appid: app.data.appid,
    }).then(res => {
      const result = res.rpara['0'].value
      if (result) {
        wx.showToast({title: result, icon: 'none'})
      } else {
        this.getCode()
        wx.showToast({title: '绑定成功'})
      }
    })
  },

  // 取消绑定
  unbind() {
    app.api.app_binding({
      in_type: '解绑', in_account: '', in_name: this.data.number, in_openid: app.data.openid, in_appid: app.data.appid,
    }).then(res => {
      this.getCode()
      wx.showToast({title: '解绑成功'})
    })
  },
})
