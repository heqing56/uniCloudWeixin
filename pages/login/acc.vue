<template>
  <view class="accpage">
    <view class="main">
      <view class="title">账号号登录</view>
      <view class="acc">
        <text>账号</text>
        <u--input
          type="text"
          :focus="true"
          fontSize="14px"
          placeholder="请输入"
          border="surround"
          v-model="acc"
        ></u--input>
      </view>
      <view class="pwd">
        <text>密码</text>
        <u--input
          placeholder="请输入"
          fontSize="14px"
          border="surround"
          v-model="pwd"
          type="password"
        ></u--input>
      </view>
      <view class="des">用短信验证登录</view>
      <u-button class="uni-btn" @click="submit">登录</u-button>
    </view>
  </view>
</template>

<script>
import {errToast} from '../../utils/toast'
export default {
  data() {
    return {
      acc: "",
      pwd: "",
    };
  },

  methods: {
    /*登录*/
    submit() {
      if (!this.acc) {
        errToast("请填写账号")
        return;
      }
      if (!this.pwd) {
        errToast("请填写密码")
        return;
      }
      uniCloud
        .callFunction({
          name: "login",
          data: { acc: this.acc },
        })
        .then((res) => {
          if (res.result.code) {
            let arr = res.result.data;
            if (!arr.length) {
              errToast("账号错误")
              return;
            }
            uni.removeStorageSync("info");
            let data = arr[0];
            uni.setStorageSync("haslogin", JSON.stringify(true)); //是否登录过
            //个人信息
            uni.setStorage({
              key: "info",
              data: JSON.stringify(data),
              success: function () {
                uni.switchTab({
                  url: "/pages/index/index",
                });
              },
            });
          }
        });
    },
  
  },
};
</script>

<style lang="scss" scoped>
// @import '@/style.scss';
.accpage {
  background: $uni-bg-color;
  width: 100%;
  height: 100vh;
  position: fixed;
}
.main {
  position: absolute;
  top: 100px;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  font-size: $uni-font-size-base;
}
.main > .acc,
.main > .pwd {
  display: flex;
  align-items: center;
  padding: 6px 0;
}
.title {
  font-size: $uni-font-size-lg;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
}
.acc {
  border-top: 1px solid $uni-border-color-grey;
  border-bottom: 1px solid $uni-border-color-grey;
}
.pwd {
  border-bottom: 1px solid $uni-border-color-grey;
}
.des {
  font-size: $uni-font-size-sm;
  padding: 10px 0;
  color: $uni-text-color-a;
  margin-bottom: 50px;
}
</style>