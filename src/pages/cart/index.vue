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
          <icon @click='changeItemCheckbox(item.goods_id)' :color="item.cheched?'red':'#eee'" type='success' size='18'/>
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
                <div class="rect" @click='subHandle(item.goods_id)'>-</div>
                <div class="number">{{item.num}}</div>
                <div class="rect" @click='addHandle(item.goods_id)'>+</div>
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
        <icon @click='selectAll' :color="isAll?'red':'#eee'" type='success' size='18'/>全选
      </div>
      <!-- 中间的价格 -->
      <div class="total-center">
        <div class="total-price">合计：
          <text class="colorRed">
            <text>￥</text>{{allPrice}}
          </text>
        </div>
        <div class="price-tips">包含运费</div>
      </div>
      <!-- 右侧结算按钮 -->
      <div class="accounts" @click='toPay'>
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
      address: null,
      isAll: false
    }
  },
  computed: {
    allPrice () {
      // 计算商品的总价：单价 * 数量 再相加
      let sum = 0
      // 计算总价
      this.products.forEach(item => {
        // 单价 * 数量 再相加
        sum += item.goods_price * item.num
      })
      return sum
    },
    detailAddress () {
      let {provinceName, cityName, countyName, detailInfo} = this.address
      return `${provinceName}${cityName}${countyName}${detailInfo}`
    }
  },
  methods: {
    toPay () {
      // 去付款：必须保证先登录、要想登录需要微信用户进行授权
      // 所以要跳转到一个页面，在该页面让用户去点击按钮进行授权从而才能登录
      let token = mpvue.getStorageSync('mytoken')
      console.log(token)
      if (token) {
        return
      }
      mpvue.navigateTo({
        url: '/pages/auth/main'
      })
    },
    subHandle (id) {
      // 商品数量减一
      // console.log('-' + id)
      let products = [...this.products]
      let currentIndex = -1
      products.some((item, index) => {
        if (item.goods_id === id) {
          // 如果当前商品的数量是1，那么就删除该商品
          // 如果当前商品的数量大于1，那么就进行减一操作
          if (item.num === 1) {
            // 记录一下当前商品的索引,接下来使用该索引把商品删除即可
            currentIndex = index
          } else {
            // 商品数量减一
            item.num = item.num - 1
          }
          // 终止遍历
          return true
        }
      })
      // 判断是否要删除商品
      if (currentIndex !== -1) {
        // 删除商品
        products.splice(currentIndex, 1)
      }
      this.products = products
    },
    addHandle (id) {
      // 商品数量加一:根据id查询出products中的对应商品的信息，修改对应的num数量
      // console.log('+' + id)
      let products = [...this.products]
      products.some(item => {
        if (item.goods_id === id) {
          // 找到了要修改数量的商品，把对应商品数量加一
          item.num = item.num + 1
          // 终止遍历
          return true
        }
      })
      this.products = products
    },
    selectAll () {
      // 实现所有商品的全部选中或者全部取消
      // 实现思路：把products中所有商品的checked属性全部修改一遍
      // 控制全选按钮的样式
      this.isAll = !this.isAll
      let products = [...this.products]
      // 修改所有的商品的选中状态
      products.forEach(item => {
        item.cheched = this.isAll
      })
      this.products = products
    },
    changeItemCheckbox (id) {
      // 控制每件商品的选中与否：本质上就是控制每件商品的checked属性值
      // 根据id去修改相应商品的checked（保证该值在true和false之家进行切换）
      let products = [...this.products]
      products.some(item => {
        if (item.goods_id === id) {
          // 表示找到了要选中的商品
          item.cheched = !item.cheched
          // 终止遍历
          return true
        }
      })
      this.products = products
    },
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
        // 可以给每一件商品添加一个属性checked
        // checked属性的作用：控制商品是否选中
        cdata[key].cheched = false
        products.push(cdata[key])
      }
      console.log(products)
      this.products = products
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