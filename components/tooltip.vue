<template>
  <view class="tooltip" v-show="show">
    <view
      class="list"
      v-for="(it, id) in list"
      :key="id"
      @click="clickFn(it.type)"
    >
      <image
        class="imgs"
        :src="require(`../static/index/${it.icon}.png`)"
      ></image>
      <text class="text">{{ it.title }}</text>
    </view>
  </view>
</template>

<script>
import {tooltip} from '../utils/comConstData.json'
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list:tooltip.list
    };
  },
  methods: {
    clickFn(e) {
      this.$emit("tooltipTypeFn", e);
    },
  },
};
</script>

<style scoped lang="scss">
.list {
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.imgs {
  width: 30px;
  height: 20px;
}
.text {
  margin-left: 8px;
  font-size: 14px;
  padding: 14px 10px 10px 0;
  width: 100%;
  border-bottom: 1px solid $uni-border-color-6c;
}
.tooltip > .list:last-child > .text {
  border: none;
}
.tooltip {
  background: $uni-bg-color-4c;
  color: $uni-text-color-inverse;
  font-size: $uni-font-size-base;
  // padding: 10px;
  border-radius: $uni-border-radius-lg;
}
.tooltip::after {
  content: "";
  width: 16px;
  height: 16px;
  background: $uni-bg-color-4c;
  position: absolute;
  top: 0;
  right: 6px;
  transform: rotate(45deg);
}
</style>