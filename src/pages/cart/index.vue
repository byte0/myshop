<template>
  <div class="container">
    <!-- 新增收货人信息 -->
    <div class="add_addresss">
      <text>新增收货人</text>
      <span></span>
    </div>

    <div class="list-title">优购生活馆</div>
    <!-- 商品列表信息 -->
    <div class="ware-list">
      <div :key='item.goods_id' v-for='item in products' class="ware-item">
        <div>{{item.goods_name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    getCartData () {
      // 获取购物车数据
      let cdata = mpvue.getStorageSync('mycart') || {}
      // 把cdata对象转化为数组
      let products = []
      for (let key in cdata) {
        products.push(cdata[key])
      }
      this.products = products
      console.log(this.products)
    }
  },
  onLoad () {
    // 从本地存储中获取购物车商品信息
    this.getCartData()
  }
}
</script>
<style scoped lang="scss">
  @import 'main.scss'
</style>