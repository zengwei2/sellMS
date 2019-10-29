<template>
  <el-aside width="200px">
    <div class="content">
      <div class="demo-basic--circle">
        <div class="block">
          <el-avatar :size="50" :src="circleUrl"></el-avatar>外卖商家中心
        </div>
      </div>
    </div>
    <el-menu
      :default-active="activeClass"
      background-color="#304156"
      text-color="#fff"
      unique-opened
      router
    >
      <!-- 循环获取导航 -->
      <template v-for="(item,index) in navList">
        <!-- 无子导航 -->
        <el-menu-item v-if="!item.children" :index="item.path" :key="index">
          <i class="iconfont" :class="item.icon"></i>
          <span slot="title">{{item.content}}</span>
        </el-menu-item>

        <!-- 有子导航 -->
        <el-submenu v-else :index="item.path" :key="index">
          <template slot="title">
            <i class="iconfont" :class="item.icon"></i>
            <span>{{item.content}}</span>
          </template>
          <el-menu-item
            v-for="(value, i) in item.children"
            :key="i"
            :index="value.path"
          >{{value.content}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import local from '@/utils/local';  //引入本地缓存工具函数

export default {
  data() {
    return {
      //头像
      circleUrl:
        "http://localhost:8081/imgs/logo.jpg",
      navList: [
        // 后台首页
        { usergoup:'super normal', path: "/home", icon: "icon-shouye", content: "后台首页" },
        // 订单管理
        {
          usergoup:'super normal',
          path: "/home/ordermanager",
          icon: "icon-dingdan",
          content: "订单管理"
        },
        // 商品管理
        {
          usergoup:'super normal',
          path: "/home/goodsmanager",
          icon: "icon-shangpin",
          content: "商品管理",
          children: [
            { path: "/home/goodslist", content: "商品列表" },
            { path: "/home/goodsadd", content: "添加商品" }
          ]
        },
        // 店铺管理
        {
          usergoup:'super normal',
          path: "/home/shopmanager",
          icon: "icon-shop",
          content: "店铺管理"
        },
        // 账号管理
        {
          usergoup:'super',
          path: "/home/accountmanager",
          icon: "icon-zhanghao",
          content: "账号管理",
          children: [
            { path: "/home/accountlist", content: "账号列表" },
            { path: "/home/accountadd", content: "添加账号" },
            { path: "/home/modeifypassword", content: "修改密码" }
          ]
        },
        // 销售统计
        {
          usergoup:'super',
          path: "/home/shops",
          icon: "icon-xiaoshou",
          content: "销售统计",
          children: [
            { path: "/home/shoptotal", content: "商品统计" },
            { path: "/home/ordertotal", content: "订单统计" }
          ]
        }
      ]
    };
  },
  computed: {
    //设置选中的class类
    activeClass(){
      if(this.$route.path === '/home/orderedit'){
        return '/home/ordermanager'
      }else if(this.$route.path === '/home/goodsedit'){
        return '/home/goodslist'
      }
      return this.$route.path;
    }
  },
  methods: {
    getNav(){
      let usergoups = local.get('usergroup');  //从本地中获取usergroup
      this.navList = this.navList.filter(v => {
        return v.usergoup.includes(usergoups)  //过滤判断navList数组对象中是否包含usergroup
      })
    }
  },
  created() {
    this.getNav()
  },
};
</script>

<style lang="less" >
.el-aside {
  background-color: #304156;
  color: #fff;
  .content {
    text-align: center;
    margin: 10px 0;
    .el-avatar {
      vertical-align: middle;
      margin-right: 10px;
    }
  }
  .el-menu {
    border: none;
  }
  .el-submenu {
    .el-menu-item {
      background-color: #202f3f !important;
    }
  }
  i {
    margin-right: 5px;
    color: #fff;
  }
  // 设置选中时的背景颜色
  // .el-menu-item.is-active {
  //   background-color: purple !important;
  // }
}
</style>