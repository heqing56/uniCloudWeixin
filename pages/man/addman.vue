<template>
  <view class="addmanpage">
    <u--form labelPosition="left" :model="model1" :rules="rules" ref="uForm">
      <u-form-item label="姓名" prop="userInfo.name" borderBottom ref="item1">
        <u--input v-model="model1.userInfo.name" border="none"></u--input>
      </u-form-item>
      <u-form-item label="电话" prop="userInfo.phone" borderBottom ref="item2">
        <u--input v-model="model1.userInfo.phone" border="none"></u--input>
      </u-form-item>
      <u-form-item
        label="性别"
        prop="userInfo.sex"
        borderBottom
        @click="showSex = true"
        ref="item3"
      >
        <u--input
          v-model="model1.userInfo.sex"
          disabled
          disabledColor="#ffffff"
          placeholder="请选择性别"
          border="none"
        ></u--input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>
      <u-form-item
        label="头像"
        prop="userInfo.headimg"
        borderBottom
        ref="item4"
      >
        <u-upload
          :fileList="fileList3"
          @afterRead="afterRead"
          @delete="deletePic"
          :maxCount="1"
          :previewFullImage="true"
        ></u-upload>
      </u-form-item>
    </u--form>
    <u-button @click="submit" class="uni-btn btn">提交</u-button>
    <u-action-sheet
      :show="showSex"
      :actions="actions"
      title="请选择性别"
      description="如果选择保密会报错"
      @close="showSex = false"
      @select="sexSelect"
    >
    </u-action-sheet>
  </view>
</template>

<script>
import { pinyin } from "pinyin-pro";
import {addman} from '../../utils/pagesConstData.json'
import {toast} from '../../utils/toast'
export default {
  data() {
    return {
      showSex: false,
      model1: {
        userInfo: {
          name: "",
          phone: "",
          sex: "",
          sexId:'',
          headimg: "",
        },
      },
      actions:addman.actions,
      rules: addman.rules,
      radio: "",
      switchVal: false,
      fileList3: [],
    };
  },
  methods: {
    /**上传照片 */
    async afterRead(e) {
      let file = e.file;
      const result = await uniCloud.uploadFile({
        filePath: file.url,
        cloudPath: "headimg/" + file.name,
        cloudPathAsRealPath: true,
        onUploadProgress: function (progressEvent) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log("上传进度：" + percentCompleted);
        },
      });
      if (result.success) {
        this.model1.userInfo.headimg = result.fileID;
        this.fileList3 = [
          {
            url: result.fileID,
          },
        ];
      } else {
        this.model1.userInfo.headimg = "";
        this.fileList3 = [];
      }
    },
    /**删除照片 */
    async deletePic(e) {
      uniCloud
        .callFunction({
          name: "deleteFile",
          data: {
            str: this.fileList3[0].url,
          },
        })
        .then((res) => {
          if (res.result.code) {
            this.model1.userInfo.headimg = "";
            this.fileList3 = [];
          }
        });
    },
    /**登录 */
    submit() {
      this.$refs.uForm
        .validate()
        .then(() => {
          let data = Object.assign({}, this.model1.userInfo);
          data.acc = pinyin(this.model1.userInfo.name, {
            toneType: "none",
          }).replaceAll(" ", "");
          uniCloud
            .callFunction({
              name: "addman",
              data: data,
            })
            .then((res) => {
              console.log(res);
			  if(res.result.code){
          uni.$emit('addman',data)
				  uni.navigateBack({
					delta: 1,
				});
			  }
            });
        })
        .catch((errors) => {
          toast("校验失败");
        });
    },
    sexSelect(e) {
      this.model1.userInfo.sex = e.name;
      this.model1.userInfo.sexId = e.id;
      this.$refs.uForm.validateField("userInfo.sex");
    },
  },
  onReady() {
    //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    this.$refs.uForm.setRules(this.rules);
  },
};
</script>

<style scoped lang="scss">
.addmanpage {
  margin: 0 10px 20px 10px;
  background: $uni-bg-color;
  padding: 10px 20px;
  border-radius: 6px;
}
.btn {
  margin-top: 20px;
}
</style>