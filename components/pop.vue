<template>
  <u-popup :show="show" mode="top" @open="open">
    <view class="popshow">
      <view class="pophead">
        <view @click="closeFn">
          <slot name="closename"></slot>
        </view>
        <view class="poptitle">{{ title }}</view>
        <view>
          <u-button
            class="btn"
            size="mini"
            :type="popbtndisabled ? 'info' : 'success'"
            :disabled="popbtndisabled"
            text="完成"
            @click="btnFn"
            v-if="btn"
          ></u-button>
        </view>
      </view>
      <view class="popboxy">
        <slot></slot>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  name: "PopCom",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    btn: {
      type: Boolean,
      default: true,
    },
    popbtndisabled: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    open() {
      // console.log('open');
    },
    closeFn() {
      this.$emit("returnpopFn", { type: "close", data: {} });
    },

    btnFn() {
      this.$emit("returnpopFn", {
        type: "complete",
        data: { value: this.namevalue },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.popshow {
  /* height: 100vh; */
  background: $uni-bg-color-hover;
}
.pophead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 20px;
  font-size: $uni-font-size-base;
  position: relative;
}
.poptitle {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: $uni-font-size-lg;
  font-weight: bold;
}
.btn {
  padding: 12px;
}
.popboxy {
  background: $uni-bg-color;
}
</style>