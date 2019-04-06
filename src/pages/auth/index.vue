<template>
  <div>
    <button open-type='getUserInfo' @getuserinfo='getUserInfo'>授权登录</button>
  </div>
</template>
<script>
import request from '../../utils/request.js'

export default {
  data () {
    return {

    }
  },
  methods: {
    getUserInfo (e) {
      // 获取用户的授权信息,这些信息用于登录我们自己的后台接口
      let {detail} = e.mp
      // 显示调用wx.login进行登录
      mpvue.login({
        success (res) {
          if (res.code) {
            let param = {
              code: res.code,
              encryptedData: detail.encryptedData,
              iv: detail.iv,
              rawData: detail.rawData,
              signature: detail.signature
            }
            // 用户已经授权登录
            request('users/wxlogin', 'post', param).then(res => {
              let {message} = res.data
              // 把登录成功后的token存储起来，方便后续需要权限的接口使用
              mpvue.setStorageSync('mytoken', message.token)
              // 重新返回到购物车页面
              mpvue.navigateBack({
                // 跳回到前一个页面
                delta: 1
              })
            })
          }
        }
      })
    }
  }
}
</script>