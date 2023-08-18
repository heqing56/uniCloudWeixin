<template>
  <view class="ipt">
    <u--input
      placeholder=""
      v-model="namevalue"
      @change="popchange"
      type="text"
      clearable
      :focus="true"
    ></u--input>
  </view>
</template>

<script>
export default {
  data() {
    return {
      namevalue: "",
    };
  },
  onShow() {
    uni.setNavigationBarTitle({
      title: "设置名字", //这是修改后的导航栏文字
    });
  },
  onNavigationBarButtonTap(e) {
    uni.navigateBack({
      delta: 1,
    });
  },
  methods: {
    popchange(e) {
      console.log(!e);
    },
  },
};
</script>

<style scoped lang="scss">
.ipt {
  width: 100%;
  background: $uni-bg-color;
  margin: 10px 0;
  height: 36px;
  overflow: hidden;
  position: fixed;
  top: 0;
}
</style>