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
          <icon @click='changeItemCheckbox(item.goods_id)' :color="item.checked?'red':'#eee'" type='success' size='18'/>
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
import request from '../../utils/request.js'

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
      // 计算属性的好处，支持缓存
      return this.calcTotalPrice()
    },
    detailAddress () {
      return this.joinAddress()
    }
  },
  methods: {
    orderGoods () {
      // 生成要提交的订单的商品列表：选中的所有商品
      let selectProducts = []
      this.products.forEach(item => {
        if (item.checked) {
          // 选中的商品
          selectProducts.push({
            goods_id: item.goods_id,
            goods_number: item.num,
            goods_price: item.goods_price
          })
        }
      })
      return selectProducts
    },
    joinAddress () {
      // 拼接一个完整的地址
      let {provinceName, cityName, countyName, detailInfo} = this.address
      return `${provinceName}${cityName}${countyName}${detailInfo}`
    },
    calcTotalPrice () {
      // 计算总价
      // 计算商品的总价：单价 * 数量 再相加
      let sum = 0
      // 计算总价
      this.products.forEach(item => {
        // 单价 * 数量 再相加
        sum += item.goods_price * item.num
      })
      return sum
    },
    updateStorage () {
      // 把修改后的商品数据再次同步到本地存储中（修改了商品的数量）
      // 把数组重新转化为键值对存储到本地存储中：【goods_id: 商品对象信息】
      let p = {}
      this.products.forEach(item => {
        p[item.goods_id] = item
      })
      mpvue.setStorageSync('mycart', p)
    },
    toPay () {
      // 判断用户是否选择了要购买的商品
      let isSelected = this.orderGoods().length === 0
      if (isSelected) {
        // 用户没有选中商品，给一个提示并且终止提交订单
        mpvue.showToast({
          title: '请选择商品',
          icon: 'success'
        })
        return
      }
      // 去付款：必须保证先登录、要想登录需要微信用户进行授权
      // 所以要跳转到一个页面，在该页面让用户去点击按钮进行授权从而才能登录
      let token = mpvue.getStorageSync('mytoken')
      // 如果这里获取到了token，那么，下一步就要进入订单确认页面
      // 进入订单确认页面之后，就可以进行支付了
      // 用户授权并且登录微信平台之后进行创建订单的操作
      let param = {
        // 商品的总价
        order_price: this.calcTotalPrice(),
        // 收货地址
        consignee_addr: this.joinAddress(),
        // 购买的商品清单
        goods: this.orderGoods()
      }
      request('my/orders/create', 'post', param, {
        Authorization: token
      }).then(res => {
        let {message} = res.data
        let orderNumber = message.order_number
        // 把生成的订单号作为参数传递到下一个页面：订单确认页面
        mpvue.navigateTo({
          url: '/pages/order/main?order_num=' + orderNumber
        })
      })
      // 如果没有登录，就跳转到授权页面
      if (!token) {
        mpvue.navigateTo({
          url: '/pages/auth/main'
        })
      }
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
      // this.updateStorage()
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
      // this.updateStorage()
    },
    selectAll () {
      // 实现所有商品的全部选中或者全部取消
      // 实现思路：把products中所有商品的checked属性全部修改一遍
      // 控制全选按钮的样式
      this.isAll = !this.isAll
      let products = [...this.products]
      // 修改所有的商品的选中状态
      products.forEach(item => {
        item.checked = this.isAll
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
          item.checked = !item.checked
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
        cdata[key].checked = false
        products.push(cdata[key])
      }
      this.products = products
    }
  },
  onShow () {
    // 这里的生命周期函数需要使用onShow，因为要触发多次（从后台显示该页面的时候就触发一次），不可以使用onLoad，因为onLoad之在页面加载的时候触发一次
    // 从本地存储中获取购物车商品信息
    this.getCartData()
    // 页面加载成功后，从本地存储中获取地址信息
    this.address = mpvue.getStorageSync('myAddress')
  },
  onHide () {
    // 把商品相关信息同步到本地存储中
    this.updateStorage()
  }
}
</script>
<style scoped lang="scss">
  @import 'main.scss'
</style>