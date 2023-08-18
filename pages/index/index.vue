<template>
  <view class="pages">
    <seach></seach>
    <view class="list">
      <view
        v-for="(item, index) in list"
        :key="index"
        @click="clickChatFn(item)"
      >
        <listVue
          :src="item.headimg"
          :name="item.name"
          :des="item.des"
          :time="item.time"
        ></listVue>
      </view>
    </view>
    <!-- 右上角加号 的弹框 -->
    <tooltip :show="addshow" @tooltipTypeFn="tooltipTypeFn"></tooltip>
  </view>
</template>

<script>
import tooltip from "../../components/tooltip.vue";
import listVue from "../../components/list.vue";
import seach from "../../components/seach.vue";
const userInfo=JSON.parse(uni.getStorageSync("info"))

export default {
  components: { listVue, seach, tooltip },
  data() {
    return {
      list: [], //列表
      addshow: false, //右上角加号
      userid:userInfo._id
    };
  },
  onLoad() {
 
  },
  onShow(){
    this.getList(); //初始list数据
   
},
  /**点击右上角加号的事件 */
  onNavigationBarButtonTap(e) {
    this.addshow = !this.addshow;
  },
  methods: {
    /* 获取列表 */
    getList() {
      uniCloud.callFunction({
        name:'chatList',
        data:{userid:this.userid}
      }).then(res=>{
        if(res.result.code){
          this.list = res.result.data;
        }else{
          this.list=[]
        }
      })
    },
    /*点击列表 触发事件*/
    clickChatFn(e) {
      uni.navigateTo({
        url: "/pages/index/chat?data=" + JSON.stringify(e),
      });
    },
    /* 右上角弹框回调*/
    tooltipTypeFn(e) {
      console.log(e);
      if (e === "scan") {
        uni.scanCode({
          success: function (res) {
            console.log("条码类型：" + res.scanType);
            console.log("条码内容：" + res.result);
            uni.navigateTo({
              url: "/pages/common/friendInfo",
            });
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped >
.pages {
  position: relative;
}
.list {
  padding-left: 20px;
  background: $uni-bg-color;
}
.tooltip {
  position: fixed;
  right: 6px;
  top: 4px;
  z-index: 999;
}
</style>
