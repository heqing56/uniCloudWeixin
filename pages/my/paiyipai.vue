<template>
  <view class="page">
    <view class="title">设置拍一拍</view>
    <view class="ipt">
        <text>朋友拍了拍我</text>
        <u--input
          placeholder=""
          v-model="namevalue"
          @change="popchange"
          type="text"
          clearable
          :focus="true"
        ></u--input>
    </view>
    <view class="des">设置后，朋友拍你的时候将会出现</view>
    <u-button text="确定" @click="saveFn" shape="square" color="#58bf6b" class="btn"></u-button>
  </view>
</template>

<script>
export default {
  onNavigationBarButtonTap(e) {
    uni.navigateBack({
      delta: 1,
    });
  },
  methods:{
    saveFn(){
        uni.navigateBack({
            delta: 1,
        });
    }
  }
};
</script>

<style scoped lang="scss">
.page{
    background: $uni-bg-color;
    width: 100%;
    height: 100vh;
}
.btn{
    width: 160px;
    margin-top: 40px;
}
.title{
    width: 100%;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    padding:50px 0 30px 0;
}
.ipt{
    width: 80%;
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-top: 1px solid $uni-border-color-grey;
    border-bottom: 1px solid $uni-border-color-grey;
    margin: auto;
}
.des{
    width: 80%;
    margin:10px auto;
    font-size: $uni-font-size-sm;
    color:$uni-text-color-placeholder;
}
</style>