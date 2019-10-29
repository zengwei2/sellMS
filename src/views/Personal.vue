<template>
  <div class="personal">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">管理员信息</span>
      </div>
      <div class="content">
        <span>
          管理员ID:&emsp;
          <span class="contentTitle">{{accId}}</span>
        </span>
        <el-divider></el-divider>
        <span>
          账号:&emsp;
          <span class="contentTitle">{{accName}}</span>
        </span>
        <el-divider></el-divider>
        <span>
          用户组:&emsp;
          <span class="contentTitle">{{usergroup}}</span>
        </span>
        <el-divider></el-divider>
        <span class="images">
          管理员头像:
          <el-upload
            class="avatar-uploader"
            :action="imgApi"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imgUrl" :src="getImgApi + imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button size="mini" type="primary" @click='editAcc'>修改</el-button>          
        </span>
      </div>
    </el-card>
  </div>
</template>

<script>
// 个人信息接口
import { accountinfo,avataredit } from '@/api/account';

export default {
  data() {
    return {

      accId: 0, //管理员ID
      accName: "", //账号
      usergroup: "", //用户组
      imgUrl: "", //管理员头像
      imgApi: "http://127.0.0.1:3000/account/upload", //上传图片api接口
      getImgApi:"http://127.0.0.1:3000/upload/account/" //拼接图片地址
    };
  },
  methods: {
    // 图片上传成功时的钩子
    handleAvatarSuccess(res, file) {
      //上传成功之后渲染到页面
      this.imgUrl = res.imgUrl;
    },
    //上传图片之前的钩子
    beforeAvatarUpload(file) {
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!(isJPG || isPNG)) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return (isPNG || isJPG) && isLt2M;
    },
    //修改
    async editAcc(){
      let {code} = await avataredit({imgUrl:this.imgUrl})

      if(code === 0){
        this.$bus.$emit('uploadSuccess');  //发送自定义事件
      }

      console.log(code)
    },
    //获取数据
    async getData(){
      let {accountInfo} = await accountinfo();
      this.accId = accountInfo.id;
      this.accName = accountInfo.acc;
      this.usergroup = accountInfo.usergroup;
      this.imgUrl = accountInfo.imgUrl;
    }
  },
  created() {
    this.getData()
  },
};
</script>

<style lang="less" >
.personal {
  .el-card__header {
    span {
      font-size: 17px;
      &.title {
        font-weight: 600;
      }
    }
  }
  .el-card__body {
    span {
      font-size: 16px;
      .contentTitle {
        color: #409eff;
      }
      &.images {
        display: flex;
        align-items: center;
        // 上传头像
        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          width: 80px;
          height: 80px;
          margin-left: 20px;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409eff;
        }
        .avatar-uploader-icon {
          font-size: 20px;
          color: #8c939d;
          width: 80px;
          height: 80px;
          line-height: 80px;
          text-align: center;
        }
        .avatar {
          width: 80px;
          height: 80px;
          display: block;
        }
      }
      .el-button {
        margin-left: 20px;
      }
    }
  }
}
</style>