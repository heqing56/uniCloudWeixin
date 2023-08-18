<template>
  <view :style="{ background: color, height: '100vh' }">
    <view class="main">
      <image
        class="img"
        mode="widthFix"
        :src="require(`../../static/my/erweima${num}.jpg`)"
      ></image>
    </view>
    <view class="bottom" :style="{ color: fontcolor }">
      <text @click="scanFn">扫一扫</text>
      <text @click="changeStyleFn">换个样式</text>
      <text @click="saveImgFn">保存图片</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
      color: "#ffffff",
      fontcolor: "#4C4C8E",
    };
  },
  methods: {
    /**切换样式 */
    changeStyleFn() {
      this.num++;
      if (this.num > 3) {
        this.num = 0;
      }
      if (this.num == 2) {
        this.color = "#180c1a";
        this.fontcolor = "#ffffff";
        uni.setNavigationBarColor({
          frontColor: "#ffffff",
          backgroundColor: "#180c1a",
        });
      } else if (this.num == 3) {
        this.color = "#2bac69";
        this.fontcolor = "#ffffff";
        uni.setNavigationBarColor({
          frontColor: "#ffffff",
          backgroundColor: "#2bac69",
        });
      } else {
        this.color = "#ffffff";
        this.fontcolor = "#4C4C8E";
        uni.setNavigationBarColor({
          frontColor: "#000000",
          backgroundColor: "#ffffff",
        });
      }
      console.log(this.num);
    },
    /**扫一扫 */
    scanFn() {
      uni.scanCode({
        success: function (res) {
          uni.navigateTo({
            url: "/pages/common/friendInfo",
          });
        },
      });
    },
    /**保存图片 */
    saveImgFn() {
      let erweima = require(`../../static/my/erweima${this.num}.jpg`);
      uni.saveImageToPhotosAlbum({
        filePath: erweima,
        success: function () {
          uni.showToast({
            title: "已保存到相冊",
            duration: 2000,
          });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  align-items: center;
  height: 80vh;
}
.img {
  width: 100vw;
}
.bottom {
  margin-top: 50px;
  width: 100%;
  text-align: center;
}
.bottom > text {
  padding: 0 20rpx;
  //   color: #4C4C8E;
  font-size: $uni-font-size-sm;
}
.bottom > text:nth-child(2) {
  border-left: 1px solid $uni-border-color-grey;
  border-right: 1px solid $uni-border-color-grey;
}
</style>