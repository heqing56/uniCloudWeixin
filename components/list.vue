<template>
  <view class="listcom">
    <image :src="src" class="imgs" alt=""></image>
    <view class="content">
        <view class="cont">
            <view class="name">{{ name }}</view>
            <text class="time">{{ time }}</text>
        </view>
        <text class="des">{{ des }}</text>
    </view>
  </view>
</template>

<script>
export default {
    name:'ListCom',
    props:{
        src:{
            type:String,
            default:'../static/logo.png'
        },
        name:{
            type:String,
            default:'',
        },
        des:{
            type:String,
            default:'',
        },
        time:{
            type:String,
            default:'',
        },
    },
}
</script>

<style scoped lang="scss">
.listcom{
    display: flex;
    align-items: center;
}
.imgs{
    width: 42px;
    height: 42px;
    border-radius: $uni-border-radius-lg;
    flex: 0 0 auto;
}
.content{
    padding:10px 0 10px 0;
    width: calc(100vw - 90px);
    border-bottom: 1px solid $uni-border-color-grey;
    margin-left:10px ;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 48px;
}

.cont{
    display: flex;
    justify-content: space-between;
}
.name{
    font-weight:400;
    font-size: $uni-font-size-15;
}
.time{
    font-size: $uni-font-size-sm;
    color: $uni-text-color-disable;
    flex: 0 0 auto;
}
.des{
    font-size: $uni-font-size-base;
    color:$uni-text-color-bbb;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
}
</style>