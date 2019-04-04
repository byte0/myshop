<template>
  <div>
    <!-- 轮播图 -->
    <swiper indicator-dots>
      <block v-for="(item, index) in detail.pics" :key="index">
        <swiper-item>
          <image :src="item.pics_big_url" class="slide-image" mode="aspectFill"/>
        </swiper-item>
      </block>
    </swiper>
    <!-- 商品的基本信息 -->
    <div class="goods-info">
      <div class="goods-price">
        ￥ {{detail.goods_price}}
      </div>
      <div class="goods-title">
        <h4>{{detail.goods_name}}</h4>
        <div class="goods-star">
          <span class="iconfont icon-shoucang"></span>
          <p>分享</p>
          <button open-type='share' class="share-btn">分享</button>
        </div>
      </div>
    </div>
    <!-- 商品的详细信息 -->
    <div class="goods-detail">
      <div class="goods-detail-title">
        商品详情
      </div>
      <div v-html='detail.goods_introduce'></div>
    </div>
    <!-- 底部菜单 -->
    <div class="footer">
      <button class="contact"></button>
      <div class="footer-left">
        <span class="iconfont icon-kefu"></span>
        <p>联系客服</p>
      </div>
      <navigator open-type="switchTab" class="footer-left">
        <span class="iconfont icon-gouwuche"></span>
        <p>购物车</p>
      </navigator>
      <div @click='addCart' class="footer-right">
        加入购物车
      </div>
      <div class="footer-right">
        立即购买
      </div>
    </div>
  </div>
</template>
<script>
import request from '../../utils/request.js'

export default {
  data () {
    return {
      detail: {},
      goodsId: null
    }
  },
  methods: {
    addCart () {
      // 添加购物车实际上是把商品的信息填充到本地存储中
      let cart = mpvue.getStorageSync('mycart') || {}
      // 把商品的数量默认设置成1
      this.detail.num = 1
      // 把商品存入购物车：（商品的id：商品的详情）
      cart[this.detail.goods_id] = this.detail
      // 添加完成购物车之后，从新把最新的数据再次覆盖原来的数据
      mpvue.setStorageSync('mycart', cart)
      // 添加完成之后，最好给一个提示
      mpvue.showToast({
        title: '添加成功',
        icon: 'success'
      })
    },
    async loadData () {
      // 根据商品的id查询详细信息
      let res = await request('goods/detail', 'get', {
        goods_id: this.goodsId
      })
      const {message} = res.data
      this.detail = message
    }
  },
  onLoad (param) {
    // 获取路径中的参数
    this.goodsId = param.goods_id
    // 调用接口
    this.loadData()
  }
}
</script>
<style scoped lang="scss">
  @import 'main.scss'
</style>