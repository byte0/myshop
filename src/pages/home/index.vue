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
      <swiper-item :key='item.goods_id' v-for='item in imgUrls'>
        <image :src="item.image_src" class="slide-image"/>
      </swiper-item>
    </swiper>

  </div>
</template>

<script>
export default {
  data () {
    return {
      imgUrls: []
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
          that.imgUrls = message
        }
      })
    }
  },
  mounted () {
    // 调用接口请求方法
    this.swiperData()
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
</style>
