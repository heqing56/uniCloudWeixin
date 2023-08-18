<template>
  <view class="pages">
    <view class="group mycard" @click="headimgFn">
      <image
        :src="headimg"
        class="headimg"
        alt=""
      ></image>
      <view class="headtitlebox">
        <view class="headname">{{ name }}</view>
        <view class="headtitle">
          <view>微信号:{{ acc }}</view>
          <view>
            <image
              class="erweima"
              :src="require('../../static/my/erweima.png')"
              alt=""
            ></image>
            <u-icon name="arrow-right"></u-icon>
          </view>
        </view>
      </view>
    </view>
    <view class="group" v-for="(item, index) in list" :key="index">
      <view v-for="(it, ind) in item" :key="ind">
        <strip @returnFn="returnFn" :type="it.type" :src="require(`../../static/my/${it.src}.png`)" :name="it.name"></strip>
      </view>
    </view>
  </view>
</template>

<script>

import strip from "../../components/strip.vue";
import {my} from '../../utils/pagesConstData.json'
const userInfo=JSON.parse(uni.getStorageSync("info"))
export default {
  components: {
    strip,
  },
  data() {
    return {
      list: my.list,
      headimg:userInfo.headimg,
      name:userInfo.name,
      acc:userInfo.acc
    };
  },
  methods: {
    headimgFn() {
      uni.navigateTo({
        url: "/pages/my/Info",
      });
    },
    returnFn(e){
      let type = e.type;
      if (!type) {
        return;
      }
      let data = e.data;
      if (type === "set") {
        uni.navigateTo({
          url: "/pages/my/set",
        });
      } 
    }
  },
};
</script>

<style scoped lang="scss">
.group {
  margin-bottom: 8px;
}
.mycard {
  background: $uni-bg-color;
  display: flex;
  align-items: flex-end;
  /* padding: 12rpx 24rpx; */
  padding: 20px 12px 30px 30px;
}
.headimg {
  width: 60px;
  height: 60px;
  border-radius: $uni-border-radius-4;
  margin-right: 40rpx;
  flex: 0 0 auto;
}
.headtitlebox {
  width: 100%;
}
.headname {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}
.headtitle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.headtitle > view {
  display: flex;
}
.erweima{
  width: 20px;
  height: 20px;
}
</style>