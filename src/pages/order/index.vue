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
    <!-- 订单商品列表 -->
    <div class="list-title">商品列表</div>
    <div class="ware-list">
      <div class="ware-item" v-for="(item, key) in goodsData" :key="key">
        <!-- 左侧的图片 -->
        <navigator class="ware-image" url="#">
          <img :src="item.goods_small_logo" mode="aspectFill">
        </navigator>
        <!-- 右边的商品信息 -->
        <div class="ware-info">
          <navigator url="#" class="ware-title">
            {{item.goods_name}}
          </navigator>
          <div class="ware-info-btm">
            <div class="ware-price">
              <span>￥</span> {{item.goods_price}}
            </div>
            <div class="number">x {{item.num}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      address: null,
      cart: null
    }
  },
  computed: {
    goodsData () {
      // 从购物车中取出商品放到数组中
      let products = []
      for (let key in this.cart) {
        let p = this.cart[key]
        if (p.checked) {
          // 选中的商品
          products.push(p)
        }
      }
      return products
    },
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
    this.cart = mpvue.getStorageSync('mycart')
  }
}
</script>
<style scoped lang="scss">
  @import 'main.scss'
</style>