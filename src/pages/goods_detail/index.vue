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