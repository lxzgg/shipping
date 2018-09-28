const app = getApp()
import WeCropper from '../we-cropper/we-cropper.js'

const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth + 1
const height = device.windowHeight

Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      src: '',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300,
      },
    },
  },

  onLoad() {


    this.data.cropperOpt.src = app.data.image
    const {cropperOpt} = this.data

    new WeCropper(cropperOpt)
      .on('ready', (ctx) => {

      })
      .on('beforeImageLoad', (ctx) => {
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000,
        })
      })
      .on('imageLoad', (ctx) => {
        wx.hideToast()
      })
  },
  uploadTap() {
    const self = this

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const src = res.tempFilePaths[0]

        self.wecropper.pushOrign(src)
      },
    })
  },
  getCropperImage() {
    wx.showLoading({title: '请稍后~', mask: true})
    // this.wecropper.getCropperImage((src) => {
    //   if (src) {
    //     wx.previewImage({
    //       current: '', // 当前显示图片的http链接
    //       urls: [src], // 需要预览的图片http链接列表
    //     })
    //   } else {
    //     console.log('获取图片地址失败，请稍后重试')
    //   }
    // })

    this.wecropper.getCropperBase64(base64 => {
      new Promise(resolve => {
        wx.request({
          url: 'https://aip.baidubce.com/oauth/2.0/token',
          data: {
            grant_type: 'client_credentials',
            client_id: 'GAwuddXbuxuQLqi3LerhET2F',
            client_secret: '2WwLWrpPdC80oxElnbIgs4PIGCBF6hya',
          },
          success: res => {
            resolve(res.data.access_token)
          },
        })
      }).then(access_token => {
        if (!base64) return wx.showToast({title: '识别失败', icon: 'none'})
        return new Promise(resolve => {
          wx.request({
            url: `https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=${access_token}`,
            data: {
              image: base64.split(',')[1],
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
            success: res => {
              wx.hideLoading()
              const discern = res.data.words_result
              if (discern) {
                app.data.discern = discern
                wx.navigateBack()
              } else {
                return wx.showToast({title: '识别失败', icon: 'none'})
              }
            },
          })
        })

      })


    })
  },
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
})
