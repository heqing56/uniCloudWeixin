<template>
  <u-index-list :index-list="indexList">
    <seach></seach>
    <template v-for="(item, index) in indexList">
      <!-- #ifdef APP-NVUE -->
      <u-index-anchor :text="item" bgColor="#fff"></u-index-anchor>
      <!-- #endif -->
      <u-index-item>
        <!-- #ifndef APP-NVUE -->
        <u-index-anchor :text="item" bgColor="#fff"></u-index-anchor>
        <!-- #endif -->
        <view
          class="list-cell"
          v-for="(cell, index) in itemArr[item]"
          @click="clickFn(cell)"
        >
          <image :src="cell.headimg" class="imgs" alt=""></image>
          <view class="content">
            <view class="name">{{ cell.name }}</view>
          </view>
        </view>
      </u-index-item>
    </template>
  </u-index-list>
</template>

<script>
import seach from "../../components/seach.vue";
export default {
  components: {
    seach,
  },
  data() {
    return {
      indexList: [],
      itemArr: [],
    };
  },
  onLoad() {
    this.getList();
  },
  onNavigationBarButtonTap(e) {
    uni.$once("addman", this.addmanFn);
    uni.navigateTo({
      url: "/pages/man/addman",
    });
  },
  methods: {
    /**添加新用户 */
    addmanFn(e) {
      let item = e;
      item.pinyin = item.acc[0].toUpperCase();
      if (this.indexList.find((it) => it == item.pinyin) == undefined) {
        this.indexList.push(item.pinyin);
        this.itemArr[item.pinyin] = [item];
      } else {
        this.itemArr[item.pinyin].push(item);
      }
      this.indexList = this.indexList.sort();
    },
    /**点击用户 详细 */
    clickFn(e) {
      uni.navigateTo({
        url: "/pages/common/friendInfo?data=" + JSON.stringify(e),
      });
    },
    /*获取列表*/
    getList() {
      this.indexList = [];
      uniCloud
        .callFunction({
          name: "getUser",
        })
        .then((res) => {
          if (res.result.code) {
            let list = res.result.data;
            list.map((item) => {
              item.pinyin = item.acc[0].toUpperCase();
              if (this.indexList.find((it) => it == item.pinyin) == undefined) {
                this.indexList.push(item.pinyin);
                this.itemArr[item.pinyin] = [item];
              } else {
                this.itemArr[item.pinyin].push(item);
              }
            });
            this.indexList = this.indexList.sort();
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.list-cell {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 24rpx;

  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: $uni-bg-color;
  align-items: center;
  border-bottom: 1px solid $uni-border-color-grey;
}
.imgs {
  width: 42px;
  height: 42px;
  border-radius: $uni-border-radius-lg;
}
.content {
  margin-left: 20px;
}
</style>