<template>
  <el-container>
    <!-- 头部 -->
    <RightHeader></RightHeader>
    <!-- 内容 -->
    <el-main>
      <!-- home页面的路由出口 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import RightHeader from './RightHeader';

export default {
  data() {
    return {
     
    };
  },
  components:{
    RightHeader
  }
};
</script>

<style lang="less" scoped>
.el-container {
  display: flex;
  flex-direction: column;
  .el-main {
    background-color: #f0f2f5;
  }
  
}

</style>