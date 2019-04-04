<template>
  <div class="container">
    <!-- 地址信息的展示 -->
    <div class="cart-top" v-if='address'>
      <div class="receive">
        <div class="name">收货人: {{address.username}}</div>
        <div class="phonen-number">{{address.telNumber}}</div>
      </div>
      <div class="address">收货地址: {{detailAddress}}</div>
      <img src="../../../static/images/cart_border@2x.png" class="address-bar" mode="aspectFill">
    </div>
    <!-- 新增收货人信息 -->
    <div class="add_addresss" v-else @click='getAddressInfo'>
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
    <!-- 底部菜单 -->
    <div class="cart-total">
      <!-- 左侧CheckBox -->
      <div class="total-button">
        <icon type='success' size='18'/>全选
      </div>
      <!-- 中间的价格 -->
      <div class="total-center">
        <div class="total-price">合计：
          <text class="colorRed">
            <text>￥</text>
          </text>
        </div>
        <div class="price-tips">包含运费</div>
      </div>
      <!-- 右侧结算按钮 -->
      <div class="accounts">
        结算
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      products: [],
      address: null
    }
  },
  computed: {
    detailAddress () {
      let {provinceName, cityName, countyName, detailInfo} = this.address
      return `${provinceName}${cityName}${countyName}${detailInfo}`
    }
  },
  methods: {
    getAddressInfo () {
      // 获取地址信息
      let that = this
      mpvue.chooseAddress({
        success (res) {
          that.address = res
          // 同时存在在本地存储中
          mpvue.setStorageSync('myAddress', res)
        }
      })
    },
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
    // 页面加载成功后，从本地存储中获取地址信息
    this.address = mpvue.getStorageSync('myAddress')
  }
}
</script>
<style scoped lang="scss">
  @import 'main.scss'
</style>