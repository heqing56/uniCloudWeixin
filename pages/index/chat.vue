<template>
  <view class="page">
    <scroll-view
      :scroll-y="true"
      style="height: calc(100vh - 128px)"
      :scroll-into-view="toView"
      :scroll-with-animation="true"
    >
      <view v-for="(item, index) in list" :key="index">
        <!-- 我发的消息显示条 -->
        <view class="my" v-if="item.whose == whome">
          <view class="data" v-if="item.type == 'text'">
            {{ item.msg }}
          </view>
          <view v-else-if="item.type == 'img'">
            <image
              class="imgs"
              mode="widthFix"
              @click="showFn(item.img)"
              :src="item.img"
            ></image>
          </view>
          <image :src="headimg" alt=""></image>
        </view>
        <!-- 系统显示条 如时间 -->
        <view class="systemic" v-else-if="item.whose == 'systemic'">
          {{ item.data }}
        </view>
        <!-- 好友发的消息条 -->
        <view class="your" v-else>
          <image :src="yourimg" alt=""></image>
          <view class="data" v-if="item.type == 'text'">
            {{ item.msg }}
          </view>
          <view v-else-if="item.type == 'img'">
            <image
              class="imgs"
              mode="widthFix"
              @click="showFn(item.img)"
              :src="item.img"
            ></image>
          </view>
        </view>
      </view>
      <!-- 每次消息更新时 触底节点 -->
      <view id="bottom"></view>
    </scroll-view>
    <!-- 消息输入栏 -->
    <view class="bottom" :style="{ height: bottom + 'px' }">
      <image
        :src="require('../../static/index/yuyin.png')"
        @click="clickYuyinFn"
      ></image>
      <textarea
        placeholder=" "
        border="surround"
        v-model="value"
        :fixed="true"
        confirm-type="send"
        :confirm-hold="true"
        :show-confirm-bar="false"
        :adjust-position="true"
        class="ipt"
        @focus="focusFn"
        @blur="blurFn"
        @confirm="confirmFn"
      ></textarea>
      <image
        :src="require('../../static/index/biaoqing.png')"
        @click="clickBiaoqingFn"
      ></image>
      <image
        :src="require('../../static/index/jia.png')"
        @click="clickGengduoFn"
      ></image>
    </view>
  </view>
</template>

<script>
const userInfo = JSON.parse(uni.getStorageSync("info"));
const todo = uniCloud.importObject("todo");
import { mapState, mapGetters, mapMutations, mapActions } from "vuex"; //引入mapState
export default {
  data() {
    return {
      whome: userInfo.acc,
      headimg: userInfo.headimg,
      uaerid: userInfo._id,
      bottom: 60, //输入栏安全触底位置
      value: "", //输入内容
      youacc: "", //好友账号 如heqing
      yourimg: "", //好友头像
      toView: "", //消息触底节点  值为节点id
      _id: "", //当前消息的_id  用于添加消息内容
      list: [], //聊天记录
      otherData: "",
      push_clientid: JSON.parse(uni.getStorageSync("push_clientid")),
    };
  },
  computed: {
    ...mapState({
      // 从state中拿到数据 箭头函数可使代码更简练
      username: (state) => state.username,
      age: (state) => state.age,
    }),
    ...mapGetters(["timeString"]),
  },
  onLoad(option) {
    let data = JSON.parse(option.data);
    this.setName(data.name);
    this.yourimg = data.headimg;
    this.youacc = data.acc;
    this.otherData = data;
    this.gitListFn();
  },

  /**右上角 ... */
  onNavigationBarButtonTap(e) {
    console.log("点击了右上角的...");
  },
  methods: {
    ...mapMutations(["add"]), //对象展开运算符直接拿到add
    ...mapActions([
      "addCountAction",
      // 将 `this.addCountAction()` 映射为 `this.$store.dispatch('addCountAction')`
    ]),
    clickYuyinFn() {
      console.log(this.username);
      console.log(JSON.stringify(getApp().globalData));
    },
    clickGengduoFn() {
      let push_clientid = this.push_clientid;
      console.log(push_clientid, "push_clientid");
      uniCloud
        .callFunction({
          name: "unipush",
          data: { push_clientid },
        })
        .then((res) => {
          console.log(res);
        });
    },
    async clickBiaoqingFn() {
      const res = await todo.add("title demo", "content demo");
      console.log(res, "todo");
    },
    /**设置窗口title */
    setName(title) {
      uni.setNavigationBarTitle({
        title,
      });
    },
    /**获取消息记录 */
    gitListFn() {
      uniCloud
        .callFunction({
          name: "chat",
          data: {
            my: this.whome,
            you: this.youacc,
          },
        })
        .then((res) => {
          if (res.result.code) {
            let arr = res.result.data;
            if (arr.length) {
              this._id = arr[0]._id;
              this.list = arr[0].content;
              this.$nextTick(() => {
                this.toView = "bottom";
              });
            } else {
              this._id = "";
              this.list = [];
            }
          }
        });
    },
    /**发送消息事件 e为消息内容*/
    confirmFn(e) {
      this.toView = "";
      let data = e.detail.value;
      let obj = {
        data: {
          whose: this.whome,
          msg: data,
          type: "text",
        },
        _id: this._id,
        withWho: this.whome + "_" + this.youacc,
      };
      this.list.push(obj.data);
      uniCloud
        .callFunction({
          name: "addchat",
          data: obj,
        })
        .then(() => {
          let reqData = {
            push_clientid: this.push_clientid,
            userid: this.uaerid,
            data: {
              name: this.otherData.name,
              acc: this.youacc,
              headimg: this.yourimg,
              des: data,
              time: "16:34",
            },
          };
          uniCloud
            .callFunction({
              name: "setChatList",
              data: reqData,
            })
            .then((res) => {
              console.log(res);
            });
        });
      this.value = "";
      this.$nextTick(() => {
        this.toView = "bottom";
      });
    },
    /**图片预览  e网络链接资源*/
    showFn(e) {
      uni.previewImage({
        urls: [e],
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
        },
      });
    },

    /**输入框获取焦点 */
    focusFn() {
      this.bottom = 30;
      this.toView = "";
      this.$nextTick(() => {
        this.toView = "bottom";
      });
    },
    /**输入框失去焦点 */
    blurFn() {
      this.bottom = 60;
    },
  },
};
</script>

<style lang="scss" scoped>
.your {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 10px;
}
.your > image,
.my > image {
  width: 40px;
  height: 40px;
  border-radius: $uni-border-radius-lg;
}
.your > image {
  margin-right: 10px;
}
.my > image {
  margin-left: 10px;
}
.my {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  margin: 10px;
}
.systemic {
  text-align: center;
  width: 100%;
  margin: 20px 0;
  font-size: $uni-font-size-13;
  color: #333;
}
.imgs {
  max-width: 40vw;
}

.your .data {
  background: $uni-bg-color;
  padding: 10px 16px;
  border-radius: 4px;
  max-width: 60vw;
  word-break: break-all;
  position: relative;
}
.data::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
  top: 16px;
}
.your .data::after {
  background: $uni-bg-color;
  left: -3px;
}
.my .data::after {
  background: $uni-bg-color-5fe477;
  right: -3px;
}
.my .data {
  background: $uni-bg-color-5fe477;
  padding: 10px 16px;
  border-radius: $uni-border-radius-4;
  max-width: 60vw;
  word-break: break-all;
  position: relative;
}

.bottom {
  display: flex;
  align-items: flex-start;
  background: $uni-bg-color-grey;
  padding: 10px 0;
  position: fixed;
  width: 100vw;
  bottom: 0;
}
.bottom > image {
  width: 26px;
  height: 26px;
  margin: 0 5px;
}
.ipt {
  background: $uni-bg-color;
  height: 32px;
}
</style>