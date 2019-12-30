import config from './config.js'

export default function requese(url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data,
      method,
      success: (result) => {
        resolve(result.data)
      },
      fail: (err) => {
        reject(err)
      },
    });
  })
}