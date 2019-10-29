<template>
  <div class="home">
    <el-container>
        <!-- 左侧导航 -->
      <LeftNav></LeftNav>
      <!-- 右侧内容 -->
      <RightContent></RightContent>
    </el-container>
  </div>
</template>

<script>
import LeftNav from '../components/Laout/LeftNav'
import RightContent from '../components/Laout/RightContent'
export default {
    components:{
        LeftNav,
        RightContent
    }
};
</script>

<style lang="less" scoped>
.home{
    height: 100%;
    .el-container{
        height: 100%;
    }
    
    
}
</style>