<template>
  <div>
    <div class="search">
      <div class="search-content">
        <div class="search-input">
          <icon type='search' size='16'/>
          <input @input='searchGoods' v-model='keyword' placeholder="请输入关键字..." />
        </div>
        <button v-if='keyword' class="cancel">取消</button>
        <div v-if='keyword' class="search-modal">
          <div :key='item.goods_id' v-for='item in searchResult' class="search-item">
            {{item.goods_name}}
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>
<script>
import request from '../../utils/request.js'

export default {
  data () {
    return {
      keyword: '',
      searchResult: []
    }
  },
  methods: {
    async searchGoods () {
      // 根据关键字请求匹配到的商品列表数据
      let res = await request('goods/qsearch', 'get', {
        query: this.keyword
      })
      let {message} = res.data
      this.searchResult = message
    }
  }
}
</script>
<style scoped lang="scss">
  @import 'main.scss'
</style>

