<template>
  <div>
    <!-- 搜索条 -->
    <search-bar></search-bar>
    <!-- 菜单和内容 -->
    <div class="content">
      <div class="left">
        <div @click='changeBrand(index)' :class='{active: currentIndex === index}' :key='item.cat_id' v-for='(item, index) in cate' class="menu-item">
          {{item.cat_name}}
        </div>
      </div>
      <div class="right">
        <div :key='item1.cat_id' v-for='item1 in getRightData' class="brand-item">
          <div class="brand-title">{{item1.cat_name}}</div>
          <div class="brand-list">
            <div :key='i' v-for='(img, i) in item1.children' class="brand">
              <img :src="img.cat_icon" mode="aspectFill">
              <p>{{img.cat_name}}</p>
            </div>
          </div>
        </div>
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
      cate: [],
      currentIndex: 0,
      rightData: []
    }
  },
  components: {
    'search-bar': SearchBar
  },
  computed: {
    getRightData () {
      // 从cate数组中获取一部分数据，根据当前的索引得到的
      // 计算属性的应用场景：从既有数据中获取几部分数据或者对已有数据进行加工处理形成新的格式，计算属性的结果依赖于data中数据的变化
      let ret = this.cate.length > 0 && this.cate[this.currentIndex].children
      return ret
    }
  },
  methods: {
    async cateData () {
      // 调用接口获取分类数据
      let ret = await request('categories')
      this.cate = ret.data.message
    },
    changeBrand (index) {
      // 切换右侧商标
      this.currentIndex = index
      this.rightData = this.cate[this.currentIndex].children
    }
  },
  async mounted () {
    await this.cateData()
    // 从全部分类数据中更加当前索引取出对应的右侧数据
    this.rightData = this.cate[this.currentIndex].children
  }
}
</script>
<style scoped lang="scss">
  @import "main.scss"
</style>
