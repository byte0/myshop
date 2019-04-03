<template>
  <div>
    <div class="search">
      <div class="search-content">
        <div class="search-input">
          <icon type='search' size='16'/>
          <input @input='inputHandle' v-model='keyword' placeholder="请输入关键字" />
        </div>
        <button v-if='keyword' class="cancel">取消</button>
        <!-- 搜索结果 -->
        <div class="search-modal">
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
    async inputHandle () {
      // 根据输入的关键字，调用后台接口查询匹配的数据
      let res = await request('goods/qsearch', 'get', {
        query: this.keyword
      })
      const {message} = res.data
      this.searchResult = message
    }
  }
}
</script>
<style scoped lang="scss">
  @import 'main.scss'
</style>
