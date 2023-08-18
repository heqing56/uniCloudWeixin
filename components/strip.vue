<template>
  <view class="stripcom page" @click="clickFn">
    <view class="left">
      <image :src="src" class="img" v-if="src" alt=""></image>
      <text>{{ name }}</text>
    </view>
    <view class="right">
      <text class="text" v-if="text">{{ text }}</text>
      <image class="img" v-if="img" :src="img" alt=""></image>
      <u-icon name="arrow-right"></u-icon>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
  },
  methods: {
    clickFn() {
      this.$emit("returnFn", { type: this.type, data: { img: this.img } });
    },
  },
};
</script>

<style scoped lang="scss">
.page {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 40px;
  height: 40px;
  background: $uni-bg-color;
  padding: 6px 12px;
}
.left,
.right {
  display: flex;
  align-items: center;
}
.img {
  width: 18px;
  height: 18px;
  margin-right: 10px;
}
.text {
  margin-right: 10px;
}
</style>