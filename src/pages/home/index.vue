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
    <!-- 商品列表 -->
    <div class="floor" :key='index' v-for='(item, index) in floor'>
      <!-- 楼层的头部 -->
      <div class="floor-title">
        <img :src="item.floor_title.image_src" mode="aspectFill">
      </div> 
      <div class="floor-content">
        <div class="left">
          <img :src="item.product_list[0].image_src" mode="aspectFill">
        </div>
        <div class="right">
          <img v-if='i > 0' :key='i' v-for='(img, i) in item.product_list' :src="img.image_src" mode="aspectFill">
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
      swiper: [],
      menu: [],
      floor: []
    }
  },
  methods: {
    async queryData (path) {
      // 通用接口调用方法
      let res = await request(path)
      return res.data.message
    },
    async swiperData () {
      // 请求后台接口获取轮播图数据
      // let that = this
      // mpvue.request({
      //   url: 'https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata',
      //   success: function (res) {
      //     let {message} = res.data
      //     that.swiper = message
      //   }
      // })
      // request(url, 'get', {}, {}, () => {
      //   console.log(1)
      // })
      // request(url).then(res => {
      //   console.log(res)
      // })
      // let res = await request('home/swiperdata')
      // this.swiper = res.data.message
      this.swiper = await this.queryData('home/swiperdata')
    },
    async menuData () {
      // 请求后台接口获取轮播图数据
      // let that = this
      // mpvue.request({
      //   url: 'home/catitems',
      //   success: function (res) {
      //     let {message} = res.data
      //     that.menu = message
      //   }
      // })
      // let res = await request('home/catitems')
      // this.menu = res.data.message
      this.menu = await this.queryData('home/catitems')
    },
    async floorData () {
      // 楼层数据
      this.floor = await this.queryData('home/floordata')
    }
  },
  mounted () {
    // 调用接口请求方法
    this.swiperData()
    this.menuData()
    this.floorData()
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
.floor{
  margin-top:20rpx;
}

.floor-title{
  width:100%;
}

.floor-title img{
  width:100%;
  height:60rpx;
  display: block;
}

.floor-content{
  display: flex;
  justify-content: space-between;
  width:100%;
  padding:20rpx;
  box-sizing: border-box;
}

.floor-content .left img{
  width:232rpx;
  height:385rpx;
  border-radius:4px;
}

.floor-content .right {
  flex:1;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left:14rpx;
}

.floor-content .right img{
  width:232rpx;
  height:188rpx;
  border-radius:4px;
}
</style>
