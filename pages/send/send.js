import citys from '../address/city'

const app = getApp()

const phoneReg = /(0|86|17951)?(13[0-9]|14[579]|15[012356789]|16[56]|17[1235678]|18[0-9]|19[89])\s?[0-9]{4}\s?[0-9]{4}/
const provinceArr = [
  '北京市',
  '天津市',
  '河北省',
  '山西省',
  '内蒙古自治区',
  '辽宁省',
  '吉林省',
  '黑龙江省',
  '上海市',
  '江苏省',
  '浙江省',
  '安徽省',
  '福建省',
  '江西省',
  '山东省',
  '河南省',
  '湖北省',
  '湖南省',
  '广东省',
  '广西壮族自治区',
  '海南省',
  '重庆市',
  '四川省',
  '贵州省',
  '云南省',
  '西藏自治区',
  '陕西省',
  '甘肃省',
  '青海省',
  '宁夏回族自治区',
  '新疆维吾尔自治区',
]

const names = /[王|李|张|刘|陈|杨|黄|赵|吴|周|徐|孙|马|朱|胡|郭|何|高|林|罗|郑|梁|谢|宋|唐|许|韩|冯|邓|曹|彭|曾|肖|田|董|袁|潘|于|蒋|蔡|余|杜|叶|程|苏|魏|吕|丁|任|沈|姚|卢|姜|崔|钟|谭|陆|汪|范|金|石|廖|贾|夏|韦|傅|方|白|邹|孟|熊|秦|邱|江|尹|薛|闫|段|雷|侯|龙|史|黎|贺|顾|毛|郝|龚|邵|万|钱|覃|武|戴|孔|汤|庞|樊|兰|殷|施|陶|洪|翟|安|颜|倪|严|牛|温|芦|季|俞|章|鲁|葛|伍|申|尤|毕|聂|柴|焦|向|柳|邢|岳|齐|沿|梅|莫|庄|辛|管|祝|左|涂|谷|祁|时|舒|耿|牟|卜|路|詹|关|苗|凌|费|纪|靳|盛|童|欧|甄|项|曲|成|游|阳|裴|席|卫|查|屈|鲍|位|覃|霍|翁|隋|植|甘|景|薄|单|包|司|柏|宁|柯|阮|桂|闵|欧阳|解|强|丛|华|车|冉|房|边|辜|吉|饶|刁|瞿|戚|丘|古|米|池|滕|晋|苑|邬|臧|畅|宫|来|嵺|苟|全|褚|廉|简|娄|盖|符|奚|木|穆|党|燕|郎|邸|冀|谈|姬|屠|连|郜|晏|栾|郁|商|蒙|计|喻|揭|窦|迟|宇|敖|糜|鄢|冷|卓|花|艾|蓝|都|巩|稽|井|练|仲|乐|虞|卞|封|竺|冼|原|官|衣|楚|佟|栗|匡|宗|应|台|巫|鞠|僧|桑|荆|谌|银|扬|明|沙|薄|伏|岑|习|胥|保|和|蔺|水|云|昌|凤|酆|常|皮|康|元|平|萧|湛|禹|无|贝|茅|麻|危|骆|支|咎|经|裘|缪|干|宣|贲|杭|诸|钮|嵇|滑|荣|荀|羊|於|惠|家|芮|羿|储|汲|邴|松|富|乌|巴|弓|牧|隗|山|宓|蓬|郗|班|仰|秋|伊|仇|暴|钭|厉|戎|祖|束|幸|韶|蓟|印|宿|怀|蒲|鄂|索|咸|籍|赖|乔|阴|能|苍|双|闻|莘|贡|逢|扶|堵|宰|郦|雍|却|璩|濮|寿|通|扈|郏|浦|尚|农|别|阎|充|慕|茹|宦|鱼|容|易|慎|戈|庚|终|暨|居|衡|步|满|弘|国|文|寇|广|禄|阙|东|殴|殳|沃|利|蔚|越|夔|隆|师|厍|晃|勾|融|訾|阚|那|空|毋|乜|养|须|丰|巢|蒯|相|后|红|权逯|盖益|桓|公|万俟|司马|上官|夏侯|诸葛|闻人|东方|赫连|皇甫|尉迟|公羊|澹台|公冶|宗政|濮阳|淳于|单于|太叔|申屠|公孙|仲孙|轩辕|令狐|钟离|宇文|长孙|慕容|鲜于|闾丘|司徒|司空|亓官|司寇|仉|督|子车|颛孙|端木|巫马|公西|漆雕|乐正|壤驷|公良|拓跋|夹谷|宰父|谷粱|法|汝|钦|段干|百里|东郭|南门|呼延|归海|羊舌|微生|帅|缑|亢|况|郈|琴|梁丘|左丘|东门|西门|佘|佴|伯|赏|南宫|墨|哈|谯|笪|年|爱|仝|代][\u4E00-\u9FA5]{1,3}/

Page({
  data: {
    isDefault: false,
    address: ['北京市', '市辖区', '东城区'],
  },

  onLoad(e) {
    this.data.id = e.id
    if (!e.id) {
      app.data.address = []
    }
  },

  onShow() {
    const discern = app.data.discern

    if (discern && discern.length) {
      let str = ''
      for (let i = 0; i < discern.length; i++) {
        str += discern[i].words
      }
      this.data.discern = str
      // 提取图片文字
      this.discern()

      app.data.discern = undefined
    }

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
    wx.showLoading({title: '请稍后~', mask: true})
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

    let isDefault = this.data.isDefault ? '是' : '否'

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
        wx.hideLoading()
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
        wx.hideLoading()
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
    const discern = this.data.discern

    if (!discern) return

    const name = names.exec(discern)

    const phone = phoneReg.exec(discern) ? phoneReg.exec(discern)[0] : ''
    let province = ''
    let city = ''
    let area = ''
    for (let i = 0; i < provinceArr.length; i++) {
      const index = discern.indexOf(provinceArr[i].substring(0, 2))
      if (index >= 0) {
        province = provinceArr[i]
        break
      }
    }

    for (let i = 0; i < citys[1].length; i++) {
      const index = discern.indexOf(citys[1][i].name.substring(0, 2))
      if (index >= 0) {
        city = citys[1][i].name
        break
      }
    }

    for (let i = 0; i < citys[2].length; i++) {
      const index = discern.indexOf(citys[2][i].name.substring(0, 2))
      if (index >= 0) {
        area = citys[2][i].name
        break
      }
    }

    const address = discern.split(province + city + area)[1]

    this.setData({
      name,
      phone,
      address: [province, city, area],
      details: address || '',
    })
  },

  nav() {
    app.data.address = []
    wx.chooseLocation({
      success: res => {
        const details = res.name

        app.map.regeocoding({
          location: `${res.latitude},${res.longitude}`,
          success: res => {

            const address = resolve(res.originalData.result.formatted_address)
            this.setData({address: address, details})
          },
        })

      },
    })
  },

  selectAddress() {
    app.data.address = this.data.address
    wx.navigateTo({url: '/pages/address/address'})
  },

})

function resolve(address) {
  return address.split(/[省|市|区|县]/)
}
