<template>
  <div>
    <!-- 搜索条 -->
    <search-bar></search-bar>
  </div>
</template>
<script>
import SearchBar from '../../components/searchbar'

export default {
  data () {
    return {

    }
  },
  components: {
    'search-bar': SearchBar
  }
}
</script>