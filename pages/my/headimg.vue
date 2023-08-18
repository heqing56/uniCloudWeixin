

<template>
  <view class="pages">
    <image
      class="img"
      mode="aspectFit"
      :showLoading="true"
      :src="this.src"
    ></image>
  </view>
</template>

<script>
export default {
  data() {
    return {
      src: "",
    };
  },
  onLoad(option) {
    let data = option;
    this.src = data.src;
  },
  onNavigationBarButtonTap(e) {
    console.log(e);
  },
  methods: {
    showFn(src) {
      // 预览图片
      uni.previewImage({
        urls: [src],
        longPressActions: {
          itemList: ["发送给朋友", "保存图片", "收藏"],
          success: function (data) {
            console.log(
              "选中了第" +
                (data.tapIndex + 1) +
                "个按钮,第" +
                (data.index + 1) +
                "张图片"
            );
          },
          fail: function (err) {
            console.log(err.errMsg);
          },
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.pages {
  background: $uni-bg-color-0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 999;
}
</style>