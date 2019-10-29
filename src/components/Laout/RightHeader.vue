<template>
  <div class="right-header">
    <el-header>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in breadArr" :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>账号管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加账号</el-breadcrumb-item> -->
      </el-breadcrumb>
      <div class="right-title">
        欢迎你，{{acc}}
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <div class="demo-basic--circle">
              <div class="block">
                <el-avatar :size="40" :src="getImgApi + imgUrl" v-if="imgUrl"></el-avatar>
              </div>
            </div>
          </span>
          <el-dropdown-menu slot="dropdown" class="dropdownmenu">
            <el-dropdown-item  command="个人中心">
              个人中心
              <!-- <router-link to="/home/personal" >个人中心</router-link> -->
            </el-dropdown-item>
            <el-dropdown-item command="退出">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
  </div>
</template>

<script>
//个人信息接口
import {accountinfo} from '@/api/account';

export default {
  data() {
    return { 
      acc: "", //账号名
      imgUrl: "", //头像
      getImgApi:"http://127.0.0.1:3000/upload/account/",  //拼接图片地址
      breadArr:[] //面包屑导航数组
    };
  },
  methods: {
    // 下拉菜单
    handleCommand(val){
      //跳转到个人中心页面
      if(val === '个人中心'){
        this.$router.push('/home/personal'); //跳转到个人中心页面
      }
      //退出事件
      else if(val === '退出'){
        setTimeout(() => {
          localStorage.removeItem('token'); //删除token令牌
          // window.sessionStorage.removeItem('account');  //从缓存中删除
          this.$router.push('/login');  //回到登录页面
          //给点提示
          this.$message({
            type:'success',
            message:'退出成功,欢迎下次再来'
          })
        },1000)
      }  
    },
    //获取个人信息
    async getData(){
       let {accountInfo} = await accountinfo();
       this.acc = accountInfo.acc;
       this.imgUrl = accountInfo.imgUrl;
    },
    getBreadData(){
      // console.log(this.$route.meta.getBread)
      this.breadArr = this.$route.meta.getBread
    }
    
  },
  created() {
    this.getData();

    //如果图片修改成功之后，图片自动改变
    this.$bus.$on('uploadSuccess',() => {
      console.log(1)
      this.getData()
    })

    //进入页面时，加载调用获取面包屑
    this.getBreadData()
  },
  watch: {
    '$route.path'(){
      this.getBreadData()
    }
  },
};
</script>

<style lang="less" >
.right-header {
  .el-header {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // 右侧内容头像
    .right-title{
      font-size: 14px;
      .el-dropdown {
        // cursor: pointer;
        .el-avatar {
          vertical-align: middle;
          margin-left: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}


</style>