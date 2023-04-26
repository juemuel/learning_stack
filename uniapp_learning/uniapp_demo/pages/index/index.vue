<template>
 <view class="content">

  <text class="my-title">我的页面</text>

  <view class="image">
   <image class="image" src="../../static/logo.png" mode=""></image>
  </view>

  <view class="body-container">
   <text>{{ meaasge }}</text>
  </view>

  <view class="body-button">
   <button type="primary" @click="goto('/pages/index/index')">通过方法跳转到首页</button>
  </view>

 </view>
</template>

<script>
 
 export default {
  data() {
   return {
    meaasge:'开始学习我的uni-app啦'
   }
  },
  methods: {
    goto(url) {
    uni.switchTab({
     url:url
     })
   }
  }
 }
</script>

<style lang="scss" scoped>
 .content {
  padding: 20upx;
  .my-title {
   color: #2B9939;
   font-weight: bold;
  }
  .image {
   padding: 10upx;
   border-radius: 250upx;
   width: $uni-img-size-lg;
   height: $uni-img-size-lg;
  }
  .body-container {
   padding-top: 20upx;
  }
  .body-button {
   padding-top: 40upx;
  }
 }
</style>