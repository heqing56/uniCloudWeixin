<template>
  <view class="pages">
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
  </view>
</template>

<script>
import strip from "../../components/strip.vue";
import {info} from '../../utils/pagesConstData.json'
const userInfo=JSON.parse(uni.getStorageSync("info"))

export default {
  components: {
    strip,
  },
  data() {
    return {
      list:info.list.map((item,index)=>{
      if(index===0){
        item[0].img=userInfo.headimg
        item[1].text=userInfo.name
      }
      return item
    })
    };
  },
  methods: {
    returnFn(e) {
      let type = e.type;
      if (!type) {
        return;
      }
      let data = e.data;
      if (type === "headimg") {
        uni.navigateTo({
          url: "/pages/my/headimg?src=" + data.img,
        });
      } else if (type === "myname") {
        uni.navigateTo({
          url: "/pages/common/changeText",
        });
      } else if (type === "paipai") {
        
        uni.navigateTo({
          url: "/pages/my/paiyipai",
        });
      }else if(type==='scan'){
        uni.navigateTo({
          url: "/pages/my/erweima",
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.pages {
  background: $uni-bg-color-hover;
  width: 100%;
  height: 100vh;
}
.group {
  margin-bottom: 8px;
}
</style>