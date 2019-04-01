<template>
  <div>
    <!-- 搜索条 -->
    <div class="search-bar">
      <div class="search-input">
        <!-- <icon type='search' color='#999'/> -->
        <input placeholder="搜索" />
      </div>
    </div>
    <!-- 轮播图 -->
    <swiper indicator-dots='true'>
      <swiper-item :key='item.goods_id' v-for='item in swiper'>
        <image :src="item.image_src" class="slide-image"/>
      </swiper-item>
    </swiper>
    <!-- 菜单 -->
    <div class="menu">
      <div :key='index' v-for='(item, index) in menu' class="menu-item">
        <img :src="item.image_src">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      swiper: [],
      menu: []
    }
  },
  methods: {
    swiperData () {
      // 请求后台接口获取轮播图数据
      let that = this
      mpvue.request({
        url: 'https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata',
        success: function (res) {
          let {message} = res.data
          that.swiper = message
        }
      })
    },
    menuData () {
      // 请求后台接口获取轮播图数据
      let that = this
      mpvue.request({
        url: 'https://www.zhengzhicheng.cn/api/public/v1/home/catitems',
        success: function (res) {
          let {message} = res.data
          console.log(message)
          that.menu = message
        }
      })
    }
  },
  mounted () {
    // 调用接口请求方法
    this.swiperData()
    this.menuData()
  }
}
</script>

<style scoped>
.search-bar {
  background-color: #EB4450;
  padding: 20rpx;
}  
.search-input {
  background-color: #fff;
  text-align: center;
}
.slide-image {
  width: 750rpx;
}
.menu {
  display: flex;
  justify-content: space-around;
}
.menu .menu-item img {
  width: 128rpx;
  height: 140rpx;
}
</style>
