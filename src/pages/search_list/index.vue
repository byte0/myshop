<template>
  <div>
    <!-- 搜索条 -->
    <!-- <search-bar></search-bar> -->
    <div class="search">
      <div class="search-input">
        <icon type="search" size="16" color="#999"/>
        {{keyword}}
      </div>
    </div>
    <!-- 选项卡 -->
    <div class="tabs">
      <div @click='tabHandle(index)' :class='{active: currentIndex === index}' :key='index' v-for='(item, index) in tabNames' class="tab-item">
        {{item}}
      </div>
    </div>
    <!-- 商品的列表 -->
    <div class="goods-list">
      <navigator class='goods-item' :key='index' v-for='(item, index) in list'>
        <img :src="item.goods_small_logo" mode="aspectFill"/>
        <div class="goods-right">
          <h4>
            {{item.goods_name}}
          </h4>
          <div class="price">
            <span>￥</span>{{item.goods_price}}
          </div>
        </div>
      </navigator>
    </div>
  </div>
</template>
<script>
import SearchBar from '../../components/searchbar'
import request from '../../utils/request.js'

export default {
  data () {
    return {
      tabNames: ['综合', '销量', '价格'],
      keyword: '',
      currentIndex: 0,
      list: [],
      pagenum: 1,
      total: 0
    }
  },
  methods: {
    tabHandle (index) {
      // 修改当前tab的索引
      this.currentIndex = index
    },
    async loadData () {
      // 根据关键字加载匹配的商品列表数据
      let res = await request('goods/search', 'get', {
        query: this.keyword,
        pagenum: this.pagenum
      })
      let {message} = res.data
      // 需要把新加载的一页数据添加到list中
      let goods = [...this.list, ...message.goods]
      this.list = goods
      this.pagenum = parseInt(message.pagenum)
      this.total = message.total

      // 加载完成数据之后，让页码加1
      this.pagenum = this.pagenum + 1
    }
  },
  components: {
    'search-bar': SearchBar
  },
  async onLoad (param) {
    // 小程序的生命周期函数
    // 参数query表示路径传递过来的参数
    this.keyword = param.query
    // 页面初次展示的时候，调用loadData加载数据
    this.loadData()
  },
  onReachBottom () {
    // 滚动条触底的时候触发该方法
    this.loadData()
  }
}
</script>
<style scoped lang="scss">
  @import 'main.scss'
</style>