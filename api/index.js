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

  // 获取产品列表
  getProduct(param) {
    let data = {
      pname: 'p_wx_getproduct_list',
      sqlcontent: '{call p_wx_getproduct_list(?in_openid,?@out_msg)}',
      sqlparas: [
        {
          name: 'in_openid',
          value: param.openid,
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

  // 模糊查询省市区
  getSearchProduct(param) {
    let data = {
      pname: 'p_wx_check_province_city_area',
      sqlcontent: '{call p_wx_check_province_city_area(?in_openid,?in_content,?@out_msg)}',
      sqlparas: [
        {
          name: 'in_openid',
          value: param.openid,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_content',
          value: param.content,
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

  // 运费估算
  getCost(param) {
    let data = {
      pname: 'p_wx_pc_getcost',
      sqlcontent: '{call p_wx_pc_getcost(?in_openid,?in_shipper,?in_shippermobile,?in_shipperprovince,?in_shippercity,?in_shipperarea,?in_shipperaddr,?in_receiver,?in_receivemobile,?in_receiveprovince,?in_receivecity,?in_receivearea,?in_receiveaddr,?in_orderstarttime,?in_orderendtime,?in_goodsname,?in_goodscount,?in_goodsweight,?in_declareinsure,?in_iswaitcontrol,?in_rtnbilltype,?in_paymentmethod,?in_productid,?in_product,?in_delivertypeid,?in_delivertypename,?in_careful,?in_addrID,?@out_cost,?@out_msg)}',
      sqlparas: [
        {
          name: 'in_openid',
          value: param.openid,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_shipper',
          value: param.send.NAME,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_shippermobile',
          value: param.send.MOBILE,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_shipperprovince',
          value: param.send.PROVINCE,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_shippercity',
          value: param.send.CITY,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_shipperarea',
          value: param.send.AREA,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_shipperaddr',
          value: param.send.ADDRESS_DETAIL,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_receiver',
          value: param.take.NAME,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_receivemobile',
          value: param.take.MOBILE,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_receiveprovince',
          value: param.take.PROVINCE,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_receivecity',
          value: param.take.CITY,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_receivearea',
          value: param.take.AREA,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_receiveaddr',
          value: param.take.ADDRESS_DETAIL,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_orderstarttime',
          value: param.in_orderstarttime,
          type: 'D',
          ptype: 1,
        }, {
          name: 'in_orderendtime',
          value: param.in_orderendtime,
          type: 'D',
          ptype: 1,
        }, {
          name: 'in_goodsname',
          value: param.in_goodsname,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_goodscount',
          value: param.in_goodscount,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_goodsweight',
          value: param.in_goodsweight,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_declareinsure',
          value: param.in_declareinsure,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_iswaitcontrol',
          value: param.in_iswaitcontrol,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_rtnbilltype',
          value: param.in_rtnbilltype,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_paymentmethod',
          value: param.in_paymentmethod,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_productid',
          value: param.in_productid,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_product',
          value: param.in_product,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_delivertypeid',
          value: param.in_delivertypeid,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_delivertypename',
          value: param.in_delivertypename,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_careful',
          value: param.in_careful,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_addrID',
          value: param.in_addrID,
          type: 'C',
          ptype: 1,
        }, {
          name: 'out_cost',
          value: '',
          type: 'N',
          ptype: 2,
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

  // 公众号（小程序）下单
  order(param) {
    let data = {
      pname: 'p_wx_pc_order_info',
      sqlcontent: '{call p_wx_pc_order_info(?in_openid,?in_shipper,?in_shippermobile,?in_shipperprovince,?in_shippercity,?in_shipperarea,?in_shipperaddr,?in_receiver,?in_receivemobile,?in_receiveprovince,?in_receivecity,?in_receivearea,?in_receiveaddr,?in_orderstarttime,?in_orderendtime,?in_goodsname,?in_goodscount,?in_goodsweight,?in_declareinsure,?in_iswaitcontrol,?in_rtnbilltype,?in_paymentmethod,?in_productid,?in_product,?in_delivertypeid,?in_delivertypename,?in_careful,?in_addrID,?@out_msg)}',
      sqlparas: [
        {
          name: 'in_openid',
          value: param.openid,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_shipper',
          value: param.send.NAME,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_shippermobile',
          value: Number(param.send.MOBILE),
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_shipperprovince',
          value: param.send.PROVINCE,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_shippercity',
          value: param.send.CITY,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_shipperarea',
          value: param.send.AREA,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_shipperaddr',
          value: param.send.ADDRESS_DETAIL,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_receiver',
          value: param.take.NAME,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_receivemobile',
          value: Number(param.take.MOBILE),
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_receiveprovince',
          value: param.take.PROVINCE,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_receivecity',
          value: param.take.CITY,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_receivearea',
          value: param.take.AREA,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_receiveaddr',
          value: param.take.ADDRESS_DETAIL,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_orderstarttime',
          value: param.in_orderstarttime,
          type: 'D',
          ptype: 1,
        }, {
          name: 'in_orderendtime',
          value: param.in_orderendtime,
          type: 'D',
          ptype: 1,
        }, {
          name: 'in_goodsname',
          value: param.in_goodsname,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_goodscount',
          value: Number(param.in_goodscount),
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_goodsweight',
          value: Number(param.in_goodsweight),
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_declareinsure',
          value: Number(param.in_declareinsure),
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_iswaitcontrol',
          value: Number(param.in_iswaitcontrol),
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_rtnbilltype',
          value: param.in_rtnbilltype,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_paymentmethod',
          value: param.in_paymentmethod,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_productid',
          value: param.in_productid,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_product',
          value: param.in_product,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_delivertypeid',
          value: param.in_delivertypeid,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_delivertypename',
          value: param.in_delivertypename,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_careful',
          value: param.in_careful,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_addrID',
          value: param.in_addrID,
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

  // 支付查询
  payment_history(param) {
    let data = {
      pname: 'p_wx_payment_history',
      sqlcontent: '{call p_wx_payment_history(?in_openid,?in_pagenumber,?@rtnmsg)}',
      sqlparas: [
        {
          name: 'in_openid',
          value: param.in_openid,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_pagenumber',
          value: param.in_pagenumber,
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

  // 编码绑定
  app_binding(param) {
    let data = {
      pname: 'P_WX_APP_BINDING',
      sqlcontent: '{call P_WX_APP_BINDING(?in_type,?in_account,?in_name,?in_openid,?in_appid,?@out_message)}',
      sqlparas: [
        {
          name: 'in_type',
          value: param.in_type,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_account',
          value: param.in_account,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_name',
          value: param.in_name,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_openid',
          value: param.in_openid,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_appid',
          value: param.in_appid,
          type: 'C',
          ptype: 1,
        }, {
          name: 'out_message',
          value: '',
          type: 'C',
          ptype: 2,
        },
      ],
    }
    return ajax.post('', data)
  },

  // 获取绑定信息
  binding_info(param) {
    let data = {
      pname: 'P_WX_Get_Userinfo',
      sqlcontent: '{call P_WX_Get_Userinfo(?in_openid,?in_appid,?out_account,?out_name,?@out_message)}',
      sqlparas: [
        {
          name: 'in_openid',
          value: param.in_openid,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_appid',
          value: param.in_appid,
          type: 'C',
          ptype: 1,
        }, {
          name: 'out_account',
          value: param.out_account,
          type: 'C',
          ptype: 1,
        }, {
          name: 'out_name',
          value: param.out_name,
          type: 'C',
          ptype: 1,
        }, {
          name: 'out_message',
          value: '',
          type: 'C',
          ptype: 2,
        },
      ],
    }
    return ajax.post('', data)
  },

  // 发货记录查询
  orderlist(param) {
    let data = {
      pname: 'p_wx_pc_orderlist',
      sqlcontent: '{call p_wx_pc_orderlist(?in_openid,?in_checktime,?in_waybillno,?in_signStatus,?@out_msg)}',
      sqlparas: [
        {
          name: 'in_openid',
          value: param.in_openid,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_checktime',
          value: param.in_checktime,
          type: 'N',
          ptype: 1,
        }, {
          name: 'in_waybillno',
          value: param.in_waybillno,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_signStatus',
          value: param.in_signStatus,
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

  // 支付回调
  PayState(param) {
    let data = {
      pname: 'P_PayState_2',
      sqlcontent: '{call P_PayState_2(?in_openid,?in_waybillno,?in_time_end,?in_total_fee,?in_PayType,?in_transaction_id,?@out_msg)}',
      sqlparas: [
        {
          name: 'in_openid',
          value: param.in_openid,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_waybillno',
          value: param.in_waybillno,
          type: 'N',
          ptype: 1,
        }, {
          name: 'in_time_end',
          value: param.in_time_end,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_total_fee',
          value: param.in_total_fee,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_PayType',
          value: param.in_PayType,
          type: 'C',
          ptype: 1,
        }, {
          name: 'in_transaction_id',
          value: param.in_transaction_id,
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

  // 运单查询应付
  checkpayment(param) {
    let data = {
      pname: 'p_wx_checkpayment',
      sqlcontent: '{call p_wx_checkpayment(?in_openid,?in_waybillno,?@out_id,?@out_msg,?@out_item_billid,?@out_startcity,?@out_shipper,?@out_ysstate,?@out_tgtcity,?@out_consignee,?@out_receivablemoney,?@out_unclearedmoney,?@out_msg)}',
      sqlparas: [
        {
          name: 'in_openid',
          value: param.in_openid,
          type: 'C',
          ptype: 1,
        },
        {
          name: 'in_waybillno',
          value: param.in_waybillno,
          type: 'C',
          ptype: 1,
        }, {
          name: 'out_id',
          value: '',
          type: 'C',
          ptype: 2,
        }, {
          name: 'out_item_billid',
          value: '',
          type: 'C',
          ptype: 2,
        }, {
          name: 'out_startcity',
          value: '',
          type: 'C',
          ptype: 2,
        }, {
          name: 'out_shipper',
          value: '',
          type: 'C',
          ptype: 2,
        }, {
          name: 'out_ysstate',
          value: '',
          type: 'C',
          ptype: 2,
        }, {
          name: 'out_tgtcity',
          value: '',
          type: 'C',
          ptype: 2,
        }, {
          name: 'out_consignee',
          value: '',
          type: 'C',
          ptype: 2,
        }, {
          name: 'out_receivablemoney',
          value: '',
          type: 'N',
          ptype: 2,
        }, {
          name: 'out_unclearedmoney',
          value: '',
          type: 'N',
          ptype: 2,
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

}

