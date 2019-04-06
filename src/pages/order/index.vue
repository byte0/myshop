<template>
  <div>
    <!-- 收货人信息 -->
    <div class="cart-top" >
      <div class="receive">
        <div class="name">收货人: {{address.userName}}</div>
        <div class="phonen-number">{{address.telNumber}}</div>
      </div>
      <div class="address">收货地址: {{joinAddress}}</div>
      <img src="../../../static/images/cart_border@2x.png" class="address-bar" mode="aspectFill">
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      address: null
    }
  },
  computed: {
    joinAddress () {
      // 拼接一个完整的地址
      let {provinceName, cityName, countyName, detailInfo} = this.address
      let str = `${provinceName}${cityName}${countyName}${detailInfo}`
      return str
    }
  },
  methods: {
    // 在mpvue的插值表达式中，不可以直接使用函数调用
    // joinAddress () {
    //   console.log('----')
    //   return 'hello'
    // }
  },
  onShow () {
    this.address = mpvue.getStorageSync('myAddress')
  }
}
</script>
<style scoped lang="scss">
  @import 'main.scss'
</style>