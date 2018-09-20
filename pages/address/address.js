const app = getApp()
import city from 'city'

const please = {name: '请选择'}

Page({

  data: {
    hotSelect: false,
    // 省
    provinces: [],
    // 市
    cities: [please],
    // 区
    areas: [please],
    selectProvince: [0],
    selectCity: [0],
    selectArea: [0],
    // 热门城市
    hot: ['深圳', '荆门', '淮北', '许昌', '三门峡', '南阳', '福州', '厦门'],
  },

  onLoad(e) {
    this.initArea()
  },

  // 初始化城市
  initArea() {
    city[0].unshift(please)
    this.setData({provinces: city[0]})

    const address = app.data.address

    this.findHot(address[1])

    const areas = this.data.areas
    for (let i = 0; i < areas.length; i++) {
      if (areas[i].name.indexOf(address[2]) >= 0) {
        this.setData({selectArea: [i]})
      }
    }
  },

  // 省份改变
  provinceChange(e) {
    const index = e.detail.value[0]
    const provinces = this.data.provinces

    if (!index) return this.setData({selectProvince: [0], cities: [please], areas: [please]})

    if (index > provinces.length - 1) return

    const {code} = provinces[index]

    const cities = [please]

    if (!code) return cities

    this.setData({
      cities: cities.concat(this.getCities(code)),
      selectProvince: [index],
      selectCity: [0],
      areas: [please],
    })
  },

  // 获取城市
  getCities(code) {
    const cities = []
    for (let i = 0; i < city[1].length; i++) {
      if (city[1][i].provinceCode === code) {
        cities.push(city[1][i])
      }
    }
    return cities
  },

  // 城市改变
  cityChange(e) {
    if (this.data.selectHot) {
      //热门锁,防止触发值改变事件
      return this.data.selectHot = false
    }
    const index = e.detail.value[0]
    const cities = this.data.cities

    if (!index) return this.setData({selectCity: [0], areas: [please]})

    if (index > cities.length - 1) return

    const {code} = cities[index]

    const areas = [please]

    if (!code) return areas

    this.setData({areas: areas.concat(this.getAreas(code)), selectCity: [index]})
  },

  // 获取地区
  getAreas(code) {
    const areas = []
    for (let i = 0; i < city[2].length; i++) {
      if (city[2][i].cityCode === code) {
        areas.push(city[2][i])
      }
    }
    return areas
  },

  // 区县改变
  areaChange(e) {
    const index = e.detail.value[0]
    this.setData({selectArea: [index]})
  },

  // 选择热门城市
  selectHot(e) {

    const {name} = e.currentTarget.dataset

    this.findHot(name)
  },


  // 查找热门城市
  findHot(name) {
    // 循环找到热么城市code
    let item = this.searchCity(name)

    if (!item) return

    let cities
    let provinces = this.data.provinces
    let selectProvince = []
    // 循环找到热门城市省级下标
    for (let i = 0; i < provinces.length; i++) {
      if (provinces[i].code === item.provinceCode) {
        cities = this.getCities(item.provinceCode)
        selectProvince = [i]
        break
      }
    }

    if (!cities) return

    let areas
    let selectCity = []
    // 循环找到热门城市城市下标
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].code === item.code) {
        areas = this.getAreas(item.code)
        selectCity = [++i]
        break
      }
    }

    if (!areas) return

    this.setData({
      cities: [please].concat(cities),
      areas: [please].concat(areas),
      selectHot: true,
    })
    this.setData({
      selectProvince,
      selectCity,
      selectArea: [0],
    })
  },

  // 搜索省份
  searchProvince(name) {
    for (let i = 0; i < city[0].length; i++) {
      if (city[0][i].name.indexOf(name) >= 0) {
        return city[0][i]
      }
    }
  },

  // 搜索城市
  searchCity(name) {
    for (let i = 0; i < city[1].length; i++) {
      if (city[1][i].name.indexOf(name) >= 0) {
        return city[1][i]
      }
    }
  },

  // 搜索区县
  searchArea(name) {
    let arr = []
    for (let i = 0; i < city[2].length; i++) {
      if (city[2][i].name.indexOf(name) >= 0) {
        arr.push(city[2][i])
      }
    }
    return arr
  },

  clear() {
    this.setData({search: '', searchVal: ''})
  },

  // 搜索
  search(e) {
    const {value} = e.detail
    if (value.trim().length < 2) {
      return
    }
    this.setData({search: '', searchVal: value})
    let result = this.searchProvince(value)
    let level = 0
    if (!result) {
      level = 1
      result = this.searchCity(value)
    }
    if (!result) {
      level = 2
      result = this.searchArea(value)
    }
    if (!result) return

    let arr = []
    if (level === 0) {
      const cities = this.getCities(result.code)
      for (let i = 0; i < cities.length; i++) {
        const areas = this.getAreas(cities[i].code)
        for (let j = 0; j < areas.length; j++) {
          arr.push({name: `${result.name}-${cities[i].name}-${areas[j].name}`, item: areas[j]})
        }
      }

    } else if (level === 1) {

      let provinceName = ''
      for (let i = 0; i < city[0].length; i++) {
        if (city[0][i].code === result.provinceCode) {
          provinceName = city[0][i].name
        }
      }

      const areas = this.getAreas(result.code)
      for (let j = 0; j < areas.length; j++) {
        arr.push({name: `${provinceName}-${result.name}-${areas[j].name}`, item: areas[j]})
      }

    } else if (level === 2) {

      for (let j = 0; j < result.length; j++) {


        let provinceName = ''
        for (let i = 0; i < city[0].length; i++) {
          if (city[0][i].code === result[j].provinceCode) {
            provinceName = city[0][i].name
          }
        }

        let cityName = ''
        for (let i = 0; i < city[1].length; i++) {
          if (city[1][i].code === result[j].cityCode) {
            cityName = city[1][i].name
          }
        }

        arr.push({name: `${provinceName}-${cityName}-${result[j].name}`, item: result[j]})
      }
    }

    for (let i = 0; i < arr.length; i++) {
      arr[i].arr = arr[i].name.split(value)
    }

    this.setData({search: {name: value, list: arr}})
  },

  // 选择搜索结果
  selectSearch(e) {
    const name = e.currentTarget.dataset.item.name
    app.data.address = name.split('-')
    wx.navigateBack()
  },

  // 确定
  define() {
    const pid = this.data.selectProvince[0]
    const cid = this.data.selectCity[0]
    const aid = this.data.selectArea[0]

    if (cid === 0 || aid === 0) {
      return wx.showToast({title: '请选择地址', icon: 'none'})
    }

    const provinces = this.data.provinces[pid].name
    const city = this.data.cities[cid].name
    const area = this.data.areas[aid].name
    app.data.address = [provinces, city, area]
    wx.navigateBack()
  },
})
