<template>
  <view class="login">
    <view class="main">
      <image :src="src" class="img" alt="" />
      <view class="acc">{{ phone }}</view>
      <view class="pwd">
        <text>密码</text>
        <u--input
          placeholder="请填写微信密码"
          cursorSpacing="0"
          :adjustPosition="false"
          fontSize="14px"
          v-model="pwd"
          clearable
          :autoBlur="true"
          type="password"
        >
        </u--input>
      </view>
      <view class="test" cursor-spacing="30"> 用短信验证登录 </view>
    </view>
    <view class="btnBox">
      <u-button class="uni-btn" @click="loginFn" text="登录"></u-button>
    </view>
    <view class="other">
      <text>找回密码</text>
      <text>紧急冻结</text>
      <text @click="otherFn">更多选项</text>
    </view>
  </view>
</template>

<script>
import {errToast} from '../../utils/toast'
export default {
  data() {
    return {
      src: '../../static/my/headimg.jpg', //头像
      phone: "+86 136 9900 4028", //账号
      acc: "heqing",
      pwd: "", //密码
    };
  },
  methods: {
    // 登录
    loginFn() {
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
          console.log(res)
          if (res.result.code) {
            let arr = res.result.data;
            if (arr.length) {
              let data = arr[0];
              uni.setStorageSync("haslogin", JSON.stringify(true)); //是否登录过
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
          }
        });
    },
    // 更多选项 手机号登录
    otherFn() {
      uni.navigateTo({
        url: "/pages/login/acc",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  background: $uni-bg-color;
  position: relative;
  width: 100vw;
  height: 100vh;
}

.main {
  width: 100%;
  height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 40px;
}
.img {
  width: 60px;
  height: 60px;
  border-radius: 8px;
}
.acc {
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0 40px;
}
.pwd {
  width: 80%;
  display: flex;
  align-items: center;
  padding: 8px;
  margin-bottom: 15px;
  border-top: 1px solid $uni-border-color-grey;
  border-bottom: 1px solid $uni-border-color-grey;
}
.pwd > text {
  margin-right: 10px;
}
.test {
  font-size: $uni-font-size-sm;
  width: 80%;
  color: $uni-text-color-a;
}

.btnBox {
  width: 100%;
  background: $uni-bg-color;
  position: relative;
  z-index: 2;
}

.other {
  text-align: center;
  width: 100%;
  position: absolute;
  bottom: 30px;
}
.other > text {
  margin: 10px;
  font-size: $uni-font-size-sm;
  color: $uni-text-color-a;
}
</style>