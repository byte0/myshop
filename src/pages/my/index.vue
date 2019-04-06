<template>
  <div class="container">
    <!-- 头部 -->
    <div class="header">
      <span class="iconfont icon-icon_set_up"></span>
      <div class="profile">
        <!-- 获取头像 -->
        <div class="head-img">
          <open-data type="userAvatarUrl"></open-data>
        </div>
        <!-- 昵称 -->
        <open-data type="userNickName"></open-data>
      </div>
      <span class="iconfont icon-dakaihuihua"></span>
    </div>
    
    <div class="content">
      <!-- 收藏店铺 -->
      <div class="profile-info">
        <!-- 我的信息列表 -->
        <div class="profile-item" v-for="(item, index) in profileList" :key="index">
          <p>{{item.number}}</p>
          <p>{{item.text}}</p>
        </div>
      </div>

      <!-- 我的订单 -->
      <div class="order-list">
        <div class="order-title">
          我的订单
        </div>
        <div class="order-content">
          <div class="order-item" v-for="item in orders" :key="item.index">
            <span class="iconfont" :class="item.className"></span>
            <p>{{item.text}}</p>
          </div>
        </div>
      </div>

      <!-- 管理收货地址 -->
      <div class="manage-list">
        <div class="manage-item" @click="getAddress">
          <div class="left">收货地址管理</div>
          <span class="arrow"></span>
        </div>

        <div class="manage-item" @click="getMakePhone('020-110')">
          <div class="left">联系客服</div>
          <span>110</span>
        </div>

        <div class="manage-item">
          <div class="left">意见反馈</div>
          <span class="arrow"></span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      profileList: [
        {text: '收藏的店铺', number: 0},
        {text: '收藏的商品', number: 0},
        {text: '关注的商品', number: 0},
        {text: '我的足迹', number: 0}
      ],
      orders: [
        {text: '待付款', className: 'icon-daifukuan'},
        {text: '待收货', className: 'icon-icon3'},
        {text: '退货/退款', className: 'icon-icon5'},
        {text: '全部订单', className: 'icon-icon_order'}
      ]
    }
  },

  methods: {
    getAddress () {
      // 获取收货地址
      wx.chooseAddress({
        // 注意：使用箭头函数
        success: (res) => {
          // 拼接地址对象
          this.address = {
            name: res.userName,
            telNumber: res.telNumber
          }
          // 把地址保存到本都
          wx.setStorageSync('myAddress', this.address)
        }
      })
    },
    // 拨打电话
    getMakePhone (num) {
      wx.makePhoneCall({
        phoneNumber: num
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import 'main.scss'
</style>
