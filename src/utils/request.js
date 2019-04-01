// 封装一个通用的请求方法
const request = (path, method = 'GET', data = {}, header = {}) => {
  // 把异步的请求放到Promise实例中处理
  let url = `https://www.zhengzhicheng.cn/api/public/v1/${path}`
  let p = new Promise(function (resolve, reject) {
    // 这个位置进行异步操作
    mpvue.request({
      url,
      method,
      data,
      header,
      success: function (res) {
        // console.log(res)
        // callback(res)
        resolve(res)
      }
    })
  })
  return p
}

export default request
