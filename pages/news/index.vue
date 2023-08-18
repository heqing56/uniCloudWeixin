<template>
  <view class="pages">
    <view class="group" v-for="(item, index) in list" :key="index">
      <view v-for="(it, ind) in item" :key="ind">
        <strip :src="require(`../../static/news/${it.src}.png`)" :name="it.name"></strip>
      </view>
    </view>
  </view>
</template>

<script>
import strip from "../../components/strip.vue";
import {news} from '../../utils/pagesConstData.json'
export default {
  components: {
    strip,
  },
  data() {
    return {
      list:news.list
    };
  },
};
</script>

<style scoped>

.group {
  margin-bottom: 8px;
}
</style>