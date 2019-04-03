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
      searchResult: [],
      isLoading: false,
      timer: null
    }
  },
  methods: {
    async searchGoods () {
      // 根据关键字请求匹配到的商品列表数据
      // 防抖处理：如果请求正在进行，此时不允许再次发送请求，必须等到当前请求结果返回之后才可以再次发送请求
      // 1、如果标志位是false，就允许触发请求；如果是true就不允许触发请求
      if (this.isLoading) {
        // 终止后续代码的执行
        return
      }
      // 2、禁止再次触发
      this.isLoading = true
      // 通过定时任务的方式延迟执行评率
      this.timer = setTimeout(async () => {
        // 关闭上次的定时任务
        clearTimeout(this.timer)
        // 发送请求
        let res = await request('goods/qsearch', 'get', {
          query: this.keyword
        })
        let {message} = res.data
        this.searchResult = message
        // 3、服务返回数据之后，放开isLoading开关
        this.isLoading = false
      }, 3000)
    }
  }
}
</script>
<style scoped lang="scss">
  @import 'main.scss'
</style>

