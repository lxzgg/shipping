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
    this.wecropper.getCropperImage((src) => {
      if (src) {
        wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: [src], // 需要预览的图片http链接列表
        })
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
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
