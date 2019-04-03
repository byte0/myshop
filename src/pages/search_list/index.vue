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
    }
  },
  components: {
    'search-bar': SearchBar
  },
  async onLoad (param) {
    // 小程序的生命周期函数
    // 参数query表示路径传递过来的参数
    // console.log(query)
    this.keyword = param.query
    // 调用后台接口获取数据
    let res = await request('goods/search', 'get', {
      query: param.query
    })
    let {message} = res.data
    this.list = message.goods
    this.pagenum = message.pagenum
    this.total = message.total
  }
}
</script>
<style scoped lang="scss">
  @import 'main.scss'
</style>