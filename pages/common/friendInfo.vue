<template>
  <view class="pages">
    <view class="group mycard">
      <image :src="img" class="headimg" alt="" @click="clickheadimgFn"></image>
      <view class="headtitlebox">
        <view class="headname">
          <text>{{ name }}</text>
          <image :src="require(`../../static/common/${sex}.png`)"></image>
        </view>
        <view class="headtitle">
          <view>微信号：bigchuiheqing</view>
          <view>地区：四川 遂宁</view>
        </view>
      </view>
    </view>
    <view class="group" v-for="(item, index) in list" :key="index">
      <view v-for="(it, ind) in item" :key="ind">
        <strip @returnFn="returnFn" :type="it.type" :name="it.name"></strip>
      </view>
    </view>
    <view class="btn" @click="clickChatFn">
      <image :src="require('../../static/common/xiaoxi.png')"></image>
      <text>发消息</text>
    </view>
  </view>
</template>

<script>
import strip from "../../components/strip.vue";
import {friendInfo} from '../../utils/pagesConstData.json'
export default {
  components: {
    strip,
  },
  data() {
    return {
      name: "",
      img: "",
      sex: "man",
      list: friendInfo.list,
      otherData: "",
    };
  },
  onLoad(option) {
    let data = JSON.parse(option.data);
    this.otherData = data;
    this.name = data.name;
    this.img = data.headimg;
    this.sex = data.sexId;
  },
  methods: {
    clickChatFn() {
      uni.navigateTo({
        url: "/pages/index/chat?data=" + JSON.stringify(this.otherData),
      });
    },
    clickheadimgFn(e) {
      uni.previewImage({
        urls: [this.img],
        longPressActions: {
          itemList: ["发送给朋友", "保存图片", "收藏"],
          success: function (data) {
            console.log(
              "选中了第" +
                (data.tapIndex + 1) +
                "个按钮,第" +
                (data.index + 1) +
                "张图片"
            );
          },
          fail: function (err) {
            console.log(err.errMsg);
          },
        },
      });
    },
    returnFn(e) {
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
    },
  },
};
</script>

<style scoped lang="scss">
.pages {
  background: $uni-bg-color-hover;
  /* background: red; */
  height: 100vh;
  width: 100%;
}
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
  display: flex;
  align-items: center;
}
.headname > image {
  width: 14px;
  height: 14px;
  margin-left: 12px;
}
.headtitle {
  width: 100%;
}
.headtitle > view {
  display: flex;
  font-size: $uni-font-size-13;
  margin-bottom: 4px;
}
.erweima {
  width: 20px;
  height: 20px;
}
.btn {
  line-height: 42px;
  height: 42px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $uni-font-size-base;
  color: $uni-text-color-a;
  background: $uni-bg-color;
  /* margin: 10px 0; */
}
.btn > image {
  width: 18px;
  height: 18px;
}
</style>