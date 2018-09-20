import ajax from './ajax.js'

export default {
  // 授权登录
  userlogin(param) {
    let data = {
      pname: 'p_wx_userlogin',
      sqlcontent: '{call p_wx_userlogin(?in_openid,?in_mobile,?in_nickname,?in_avatarurl,?in_city,?in_province,?in_country,?in_language,?in_appid,?in_timestamps,?@rtnmsg)}',
      sqlparas: [{
        'name': 'in_openid', //参数名称
        'value': param.openid,//参数值
        'type': 'C',//参数类型  字符C,日期时间D,数值N
        'ptype': 1, //输入1 ,输出2
      }, {
        'name': 'in_mobile',
        'value': '',
        'type': 'C',
        'ptype': 1,
      }, {
        'name': 'in_nickname',
        'value': '',
        'type': 'C',
        'ptype': 1,
      }, {
        'name': 'in_avatarurl',
        'value': '',
        'type': 'C',
        'ptype': 1,
      }, {
        'name': 'in_gender',
        'value': '0',
        'type': 'C',
        'ptype': 1,
      }, {
        'name': 'in_city',
        'value': '',
        'type': 'C',
        'ptype': 1,
      }, {
        'name': 'in_province',
        'value': '',
        'type': 'C',
        'ptype': 1,
      }, {
        'name': 'in_country',
        'value': '',
        'type': 'C',
        'ptype': 1,
      }, {
        'name': 'in_language',
        'value': '',
        'type': 'C',
        'ptype': 1,
      }, {
        'name': 'in_appid',
        'value': param.appid,
        'type': 'C',
        'ptype': 1,
      }, {
        'name': 'in_timestamps',
        'value': '',
        'type': 'C',
        'ptype': 1,
      }, {
        'name': 'rtnmsg',
        'value': '',
        'type': 'C',
        'ptype': 2,
      }],
    }
    return ajax.post('', data)
  },

  // 获取地址簿省份
  getprovince(param) {
    let data = {
      pname: 'p_wx_getprovince',
      sqlparas: [
        {
          name: 'in_openid',
          value: param.openid,
          type: 'C',
          ptype: 1,
        }, {
          name: 'rtnmsg',
          value: '',
          type: 'C',
          ptype: 2,
        },
      ],
    }
    return ajax.post('', data)
  },

  // 获取热门城市
  getHotCity(param) {
    let data = {
      pname: 'p_wx_gethotcity',
      sqlparas: [
        {
          name: 'in_openid',
          value: param.openid,
          type: 'C',
          ptype: 1,
        }, {
          name: 'rtnmsg',
          value: '',
          type: 'C',
          ptype: 2,
        },
      ],
    }
    return ajax.post('', data)
  },

  // 新增地址簿
  addAddress(param) {
    let data = {
      pname: 'p_wx_newaddress_add',
      sqlcontent: '{call p_wx_newaddress_add(?in_openid,?in_name,?in_mobile,?in_province,?in_city,?in_area,?in_addressdetail,?in_isdefault,?in_sendorconsider,?@rtnmsg)}',
      sqlparas: [
        {
          name: 'in_openid',
          value: param.openid,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_name',
          value: param.name,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_mobile',
          value: param.phone,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_province',
          value: param.province,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_city',
          value: param.city,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_area',
          value: param.area,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_addressdetail',
          value: param.details,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_isdefault',
          value: param.isDefault,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_sendorconsider',
          value: param.send,
          type: 'C',
          ptype: 1,
        }, {
          name: 'rtnmsg',
          value: '',
          type: 'C',
          ptype: 2,
        },
      ],
    }
    return ajax.post('', data)
  },

  // 查询地址簿
  getAddress(param) {
    let data = {
      pname: 'p_wx_checkaddress',
      sqlcontent: '{call p_wx_checkaddress(?in_openid,?in_nameormobile,?in_sendorconsider,?@rtnmsg)}',
      sqlparas: [
        {
          name: 'in_openid',
          value: param.openid,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_nameormobile',
          value: param.phone,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_sendorconsider',
          value: param.send,
          type: 'C',
          ptype: 1,
        }, {
          name: 'rtnmsg',
          value: '',
          type: 'C',
          ptype: 2,
        },
      ],
    }
    return ajax.post('', data)
  },


  // 查询物流信息
  getLogistics(param) {
    let data = {
      pname: 'p_tracking_QueryBill',
      sqlcontent: '{call p_tracking_QueryBill(?in_waybillno,?in_openid,?in_source)}',
      sqlparas: [
        {
          name: 'in_waybillno',
          value: param.No,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_openid',
          value: param.openid,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_source',
          value: '微信小程序',
          type: 'C',
          ptype: 1,
        },
      ],
    }
    return ajax.post('', data)
  },

  // 删除地址
  delAddress(param) {
    let data = {
      pname: 'p_wx_address_delete',
      sqlcontent: '{call p_wx_address_delete(?in_openid,?in_id,?@out_msg)}',
      sqlparas: [
        {
          name: 'in_openid',
          value: param.openid,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_id',
          value: param.id,
          type: 'C',
          ptype: 1,
        }, {
          name: 'out_msg',
          value: '',
          type: 'C',
          ptype: 2,
        },
      ],
    }
    return ajax.post('', data)
  },

  // 修改地址
  editAddress(param) {
    let data = {
      pname: 'p_wx_address_update',
      sqlcontent: '{call p_wx_address_update(?in_id,?in_openid,?in_name,?in_mobile,?in_province,?in_city,?in_area,?in_addressdetail,?in_isdefault,?in_sendorconsider,?@rtnmsg)}',
      sqlparas: [
        {
          name: 'in_id',
          value: param.id,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_openid',
          value: param.openid,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_name',
          value: param.name,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_mobile',
          value: param.phone,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_province',
          value: param.province,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_city',
          value: param.city,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_area',
          value: param.area,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_addressdetail',
          value: param.details,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_isdefault',
          value: param.isDefault,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_sendorconsider',
          value: param.send,
          type: 'C',
          ptype: 1,
        }, {
          name: 'rtnmsg',
          value: '',
          type: 'C',
          ptype: 2,
        },
      ],
    }
    return ajax.post('', data)
  },


}

