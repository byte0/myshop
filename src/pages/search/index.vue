<template>
  <div>
    <div class="search">
      <div class="search-content">
        <div class="search-input">
          <icon type='search' size='16'/>
          <input v-model='keyword' placeholder="请输入关键字" />
        </div>
        <button v-if='keyword' class="cancel">取消</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      keyword: ''
    }
  }
}
</script>
<style scoped lang="scss">
  @import 'main.scss'
</style>
