<template>
  <view>
    <view class="content">
      <textarea class="textarea" v-model="content" placeholder="留言"  auto-height></textarea>
      <button type="primary" size="mini" @click="chooseImage" value="添加照片">IMG</button>
      <button type="primary" size="mini" @click="publish()" >发布</button>
      <!-- <button type="primary" size="mini" @click="choose" value="上传照片">上传IMG</button> -->
    </view>
    <view class=".list" v-for="item in list" :key="item._id">
      <view class="box">
        <view class="content">{{item.content}}</view>
        <img calss="image" v-if="item.image" mode="aspectFit" :src="item.image" style="max-width: 100%;">
        <view class="time">{{formatTime(item.createTime)}}</view>
      </view>
    </view>
  </view>
</template>
<!-- export default核心是data、onLoad()、methods -->
<script>
  // 到处默认对象，vue写法
  export default {
    data() {
      return {
        defaultContent: '',
        content: '', // 输入框留言
        image: null, // 输入框照片
        list: [],   // 留言墙list
      }
    },
    onLoad() { // 加载时显示
      console.log("ONlOAD啦！")
      // 调用中文美句API，返回Promise对象
      uni.request({
        url: 'https://api.xygeng.cn/one',
        method:'GET',
        success: (res) => {
          console.log(res.data)
          this.content = res.data.data.content
        },
        fail: (err) => {
          console.log('佳句接口失败', err)
        }
      }),
      uniCloud.callFunction({
        name: 'fun',
        data: {
          api: 'getMessages',
        }
      }).then(res => {
        console.log(res.result)
        this.list = res.result.data.reverse();
      })
    },
    methods: {
      formatTime(timestamp) {
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
      },
      publish() {
        // 判空处理
        if (!this.content) return;
        // 含照片处理
        if (this.image) {
          const cloudPath = `images/${Date.now()}-${Math.floor(Math.random() * 1000000)}.png`;
          uniCloud.uploadFile({
            cloudPath,
            filePath: this.image,
          }).then((res) => {
               console.log("upload res:",res) // 
            this.addMessageCloud(res.fileID);
          }).catch((err) => {
            console.error(err);
          });
        } else {
          this.addMessageCloud();
        }
      },
      addMessageCloud(imageUrl=''){
        let ct = new Date();
        uniCloud.callFunction({
          name: 'fun',
          data: {
            api: 'publish',
            content: this.content,
            image: imageUrl,
            createTime: ct
          }
        }).then(res => {
          this.list.unshift({ // 考虑换成unshift
            _id: res.result.id,
            content: this.content,
            image: imageUrl,
            createTime:ct
          })
          this.content='' // 输入框清空
          this.image= null; // 照片清空
        }).catch((err) =>{
          console.log(err);
        })
      },
      chooseImage() {
        uni.chooseImage({
          count: 1,
          success: res => {
            this.image = res.tempFilePaths[0];
          },
          fail: err => {
            console.error(err);
          }
        });
      },
  },
  onUnload() {
    
  }
}
</script>

<style>
  /* css复盘，记得设好父子的长宽（文本、img） */
  .content {
    align-items: center;
    margin: 30rpx;
    width:100%;
  }
  .textarea {
    width:80%;
    border: none;
    border-bottom: 2rpx solid #aaa;
    padding: 10rpx;
    font-size: 30rpx;
    color: #555;
    margin-bottom: 20rpx;
/*    white-space: nowrap;
    word-wrap: break-word;
    overflow: auto; */
  }
  button{
    margin:0 20rpx;
    background-color: #2196F3;
    color: white;
    border: none;
    border-radius: 30rpx;
    padding: 10rpx 20rpx;
    font-size: 28rpx;
  }
  
  /* 留言显示区 */
  .box{
    font-size: 30rpx;
    padding: 20rpx 0;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }
  .box .content{
    width: 80%;
    margin-bottom: 20rpx;
  }
  /* 实现同比例缩放：开始设置了什么max-width、object-fit都不行 */
  /*  uni自带了mode属性，可以设置"aspectFill"*/
  .box .image{
    width: 100%;
    height: auto;
  }
  .box .time{
    font-size: 24rpx;
    color: #999;
    margin-top: 10rpx;
  }
 .list{
    margin: 20rpx;
    padding-bottom: 20rpx;
  }
</style>