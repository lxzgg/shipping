import timestamp from '../utils/timestamp'
import md5 from '../utils/md5'

export const host = 'https://www.szuem.com:8436/gbpmapi/InnerOpenServlet'

export default class ajax {
  static get(url, data) {
    return this.request(url, data, 'GET')
  }

  static post(url, contents) {

    let content = {
      username: 'openapi',
      seqno: '1582',
      clientver: '0.1',
      acceptfile: '0',
      type: 'general',
      userno: '00000',
      version: '1.0',
      sql: {
        readtype: 3,
        sqltype: 3,
        queryno: '1582',
        powner: 'UEM',
        ...contents,
      },
    }

    content = JSON.stringify(content)
    const Appkey = 'JpCehfr9Qx8/j/AQzcFIEg=='

    let data = {
      content,
      timestamp: timestamp('YYYY-MM-DD HH:mm:ss'),
      digest: wx.arrayBufferToBase64(str2Bytes(md5(content + Appkey))),
      Appkey,
    }

    return this.request(url, data, 'POST')
  }

  static request(url, data, method) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: host + url,
        data,
        method,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: (res) => {
          resolve(res.data)
        },
        fail: (res) => {
          reject(res)
        },
      })
    })
  }
}

// 十六进制字符串转字节数组
function str2Bytes(str) {// "AAAA"变成[170,170]
  let len = str.length / 2
  let pos = 0
  let arr = []
  for (let i = 0; i < len; i++) {
    arr.push(parseInt(str.substring(pos, pos + 2), 16))
    pos += 2
  }
  return arr
}
