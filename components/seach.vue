<template>
  <view class="seach">
    <u-search
      class="ipt"
      placeholder="搜索"
      height="22"
      bgColor="#fff"
      inputAlign="center"
      :showAction="false"
      shape="square"
      :disabled="true"
      @click="clickFn"
    ></u-search>
  </view>
</template>

<script>
export default {
  methods: {
    clickFn() {
      uni.navigateTo({
        url: "/pages/common/search",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.seach {
  background: $uni-bg-color-hover;
  padding: 3px 8px 10px;
}

.ipt {
  background: $uni-bg-color;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border-radius: $uni-border-radius-base;
}
</style>