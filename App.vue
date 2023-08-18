<script>
export default {
  globalData: {
    msgData: "zhangsan",
  },
  onLaunch: function () {
    console.log("App Launch");
    const value =
      uni.getStorageSync("haslogin") &&
      JSON.parse(uni.getStorageSync("haslogin"));
    if (!value) {
      uni.reLaunch({
        url: "/pages/login/index",
      });
    }
    /**unipush 消息推送 */
    uni.onPushMessage((res) => {
      console.log("收到推送消息：", res); //监听推送消息
      getApp().globalData.msgData = "list";
    });
  },
  onShow: function () {
    console.log("App Show");
    /**获取 客户端推送标识 */
    uni.getPushClientId({
      success: (res) => {
        let push_clientid = res.cid;
        console.log("客户端推送标识:", push_clientid);
        uni.setStorageSync("push_clientid", JSON.stringify(push_clientid));
      },
      fail(err) {
        console.log(err);
      },
    });
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
page {
  background: $uni-bg-color-hover;
  width: 100vw;
  height: auto;
}
</style>
