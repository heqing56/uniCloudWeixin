<template>
  <view class="set">
    <view class="group" v-for="(item, index) in list" :key="index">
      <view v-for="(it, ind) in item" :key="ind">
        <strip
          @returnFn="returnFn"
          :type="it.type"
          :name="it.name"
          :img="it.img"
          :text="it.text"
        ></strip>
      </view>
    </view>
    <view class="group btn"> 切换账号 </view>
    <view class="group btn" @click="outFn"> 退出登录 </view>
    <u-popup mode="bottom" bgColor="#f8f8f8" round="10" :show="show">
      <view>
        <view class="h des"
          >退出后不会删除任何历史数据，下次登录依然可以使用本账号。</view
        >
        <view @click="clickPopFn(true)" class="h out">退出登录</view>
        <view @click="clickPopFn()" class="h close">取消</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import strip from "../../components/strip.vue";
import {set} from '../../utils/pagesConstData.json'
export default {
  components: {
    strip,
  },
  data() {
    return {
      show: false,
      list:set.list
    };
  },
  methods: {
    outFn() {
      this.show = true;
    },
    /**推出登录 */
    clickPopFn(e) {
      if (e) {
        uni.removeStorageSync("haslogin");
        uni.removeStorageSync("push_clientid");
        uni.reLaunch({
          url: "/pages/login/index",
        });
      }
      this.show = false;
    },
  },
};
</script>

<style scoped lang="scss">
.set {
  padding-bottom: 20px;
}
.group {
  margin-bottom: 8px;
}
.btn {
  line-height: 50px;
  height: 50px;
  background: $uni-text-color-inverse;
  text-align: center;
}

.h {
  text-align: center;
  background: $uni-text-color-inverse;

  padding: 0 38px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.des {
  font-size: $uni-font-size-sm;
  color: $uni-text-color-placeholder;
  margin-bottom: 1px;
  padding: 10px 38px;
}
.out {
  color: $uni-text-error;
}
.close {
  margin-top: 8px;
  padding-bottom: 30px;
}
</style>