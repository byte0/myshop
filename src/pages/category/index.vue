<template>
  <div>
    <!-- 搜索条 -->
    <search-bar></search-bar>
    <!-- 菜单和内容 -->
    <div class="content">
      <div class="left">
        
      </div>
      <div class="right">
        
      </div>
    </div>
  </div>
</template>
<script>
import SearchBar from '../../components/searchbar'
import request from '../../utils/request.js'

export default {
  data () {
    return {
      cate: []
    }
  },
  components: {
    'search-bar': SearchBar
  },
  methods: {
    async cateData () {
      // 调用接口获取分类数据
      let ret = await request('categories')
      this.cate = ret.data.message
    }
  },
  mounted () {
    this.cateData()
  }
}
</script>
<style scoped lang="scss">
  @import "main.scss"
</style>
