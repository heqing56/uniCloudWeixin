<template>
  <view> </view>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  onLoad(option) {
    let hasValue = Object.keys(option).length;
    let data = hasValue && JSON.parse(option.data);
    console.log(data);
  },
  onNavigationBarSearchInputConfirmed() {
    console.log(this.value, "键盘上的搜索");
  },
  onNavigationBarButtonTap() {
    uni.navigateBack({
      delta: 1,
    });
  },
  onNavigationBarSearchInputChanged(e) {
    // console.log(e.text,'输入框内容变化');
    this.value = e.text;
  },
};
</script>
