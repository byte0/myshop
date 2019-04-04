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
        <!-- 左侧按钮checkbox -->
        <div class="choice-button">
          <icon type='success' size='18'/>
        </div>
        <!-- 右侧商品信息 -->
        <div class="ware-content">
          <!-- 左侧图片 -->
          <navigator class='ware-image'>
            <img :src='item.goods_small_logo' mode="aspectFill"/>
          </navigator>
          <!-- 右侧商品信息 -->
          <div class="ware-info">
            <!-- 商品名称 -->
            <navigator class='ware-title'>
              {{item.goods_name}}
            </navigator>
            <!-- 商品价格和数量变更 -->
            <div class="ware-info-btm">
              <!-- 商品价格 -->
              <div class="ware-price">
                <span>￥</span>
                {{item.goods_price}}
              </div>
              <!-- 数量变更 -->
              <div class="calculate">
                <div class="rect">-</div>
                <div class="number">{{item.num}}</div>
                <div class="rect">+</div>
              </div>
            </div>
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