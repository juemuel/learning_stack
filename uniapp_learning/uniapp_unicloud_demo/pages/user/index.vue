<template>
 <view class="my">
  <view class="person_info">
   <view class="avotor">
    <image src="#" mode=""></image>
   </view>
   <view class="nackname_and_time">
    <view class="nackname">一枚小吃货</view>
    <view class="time">好好学习，天天向上</view>
   </view>
  </view>
  <view class="line"></view>
  <view class="info" @click="goToPersonInfo">
   <text class="icon m-r-10">&#xe604;</text>
   个人中心
  </view>
  <view class="line"></view>
  <view class="info"><text class="icon m-r-10">&#xe6a9;</text>text1</view>
  <view class="line"></view>
  <view class="info"><text class="icon m-r-10">&#xe6ac;</text>text2</view>
  <view class="line"></view>
  <view class="info"><text class="icon m-r-10">&#xe62d;</text>text3</view>
 </view>
</template>

<script>
 export default {
  data() {
   return {

   }
  },
  methods: {
   goToPersonInfo(){
    uni.navigateTo({
     url: '#'
    })
   }
  }
 }
</script>

<style lang="scss" scoped>
.my {
 
}
.m-r-10 {
 margin-right: 10px;
}
.person_info {
  display:flex;
  align-items: center;
  margin: 20px 0 0 20px;
  .avotor {
   >image {
    height: 60px;
    width: 60px;
    border-radius: 50px;
   }
  }
  .nackname_and_time {
   margin-left: 10px;
   .nackname {
    
   }
   .time {
    font-size: 14px;
    color: gray;
   }
  }
}
.line {
 height: 1px;
 background: #CCCCCC;
 margin: 10px 20px;
}
.info {
 margin: 0px 0 0px 20px;
 font-size: 16px;
}
</style>