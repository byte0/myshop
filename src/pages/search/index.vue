<template>
  <div>
    <div class="search">
      <div class="search-content">
        <div class="search-input">
          <icon type='search' size='16'/>
<<<<<<< HEAD
          <input @confirm='confirmHandle' @input='inputHandle' v-model='keyword' placeholder="请输入关键字" />
        </div>
        <button @click='cancelHandle' v-if='keyword' class="cancel">取消</button>
        <!-- 搜索结果 -->
=======
          <input @confirm='confirmHandle' @input='searchGoods' v-model='keyword' placeholder="请输入关键字..." />
        </div>
        <button v-if='keyword' class="cancel">取消</button>
>>>>>>> a08e9cd6d2449c43353e536a5d926f9bdefca3fd
        <div v-if='keyword' class="search-modal">
          <div :key='item.goods_id' v-for='item in searchResult' class="search-item">
            {{item.goods_name}}
          </div>
        </div>
      </div>
    </div>
<<<<<<< HEAD
    <!-- 搜索历史关键字 -->
    <div class="history">
      <h4>搜索历史</h4>
      <icon type='clear' size='16' @click='clearHistory'/>
    </div>
    <div class="history-list">
      <div :key='index' v-for='(item, index) in keywordHistory' class="history-item">
=======
    <div class="history">
      <h4>历史搜索</h4>
      <icon type='clear' size='16'/>
    </div>
    <div class="history-list">
      <div :key='index' v-for='(item, index) in keywordList' class="history-item">
>>>>>>> a08e9cd6d2449c43353e536a5d926f9bdefca3fd
        {{item}}
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
      timer: null,
<<<<<<< HEAD
      keywordHistory: mpvue.getStorageSync('keyword') || []
    }
  },
  methods: {
    clearHistory () {
      // 清空搜索关键字的历史信息
      // 清空的是本地存储的数据（清空本地存储的数据并不会影响data中的数据）
      mpvue.clearStorageSync()
      // 清空的是data中的数据
      this.keywordHistory = []
    },
    confirmHandle () {
      // 当回车的时候，记录关键字到本地存储
      this.keywordHistory.unshift(this.keyword)
      // 把最新的数据覆盖到本地存储中
      mpvue.setStorageSync('keyword', this.keywordHistory)
    },
    cancelHandle () {
      // 清空输入框内容
      this.keyword = ''
    },
    async inputHandle () {
      // 根据输入的关键字，调用后台接口查询匹配的数据
      // 控制请求的频率(节流)：输入多个字符，但是只发送一次请求
      // 控制是否发送请求
      if (this.isLoading) {
        // 终止后续代码的执行，终止请求
        return
      }
      // isLoading变成true之后，就阻止的后续请求
      this.isLoading = true
      this.timer = setTimeout(async () => {
        // 关闭之前的定时任务
        clearTimeout(this.timer)
        let res = await request('goods/qsearch', 'get', {
          query: this.keyword
        })
        const {message} = res.data
        this.searchResult = message
        // 重新打开发送请求的开关
        this.isLoading = false
      }, 1000)
=======
      // 该属性的作用：存储搜索历史关键字，如果存在就获取；否则初始化为空数组
      keywordList: mpvue.getStorageSync('keywordList') || []
    }
  },
  methods: {
    confirmHandle () {
      // 按回车键触发
      // 回车之后需要做两件事：1、把关键字存储在本地缓存；2、根据关键字进行页面跳转
      // 1、将关键字放入缓存
      this.keywordList.unshift(this.keyword)
      // 需要对重复的关键字进行去重

      // 把原来的历史数据覆盖掉
      mpvue.setStorageSync('keywordList', this.keywordList)
    },
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
>>>>>>> a08e9cd6d2449c43353e536a5d926f9bdefca3fd
    }
  }
}
</script>
<style scoped lang="scss">
  @import 'main.scss'
</style>
<<<<<<< HEAD
=======

>>>>>>> a08e9cd6d2449c43353e536a5d926f9bdefca3fd
