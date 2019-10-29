import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    component: () => import('../views/Login.vue')
  },
  {
    path:'/home',
    component: () => import('../views/Home.vue'),
    children:[
      //后台首页
      {
        meta:{
          getBread:[
            { path:'/home',title:'首页' },
            { path:'/home',title:'后台首页' },
          ]
        },
        path:'',  //为空，则默认点击/home加载Index页面
        component:() => import('../views/Index.vue')
      },
      // 订单管理
      {
        meta:{
          getBread:[
            { path:'/home',title:'首页' },
            { path:'/home/ordermanager',title:'订单管理' }
          ]
        },
        path:'/home/ordermanager',
        component:() => import('../views/Order/OrderManager.vue')
      },
      // 订单编辑
      {
        meta:{
          getBread:[
            { path:'/home',title:'首页' },
            { path:'/home/orderedit',title:'订单编辑' }
          ]
        },
        path:'/home/orderedit',
        component:() => import('../views/Order/OrderEdit.vue')
      },
      //商品管理
      {
        meta:{
          getBread:[
            { path:'/home',title:'首页' },
            { path:'/home/goodslist',title:'商品管理' },
            { path:'/home/goodslist',title:'商品列表' }
          ]
        },
        path:'/home/goodslist',
        component:() => import('../views/GoodsManager/GoodsList.vue')
      },
      {
        meta:{
          getBread:[
            { path:'/home',title:'首页' },
            { path:'/home/goodslist',title:'商品管理' },
            { path:'/home/goodsadd',title:'商品添加' }
          ]
        },
        path:'/home/goodsadd',
        component:() => import('../views/GoodsManager/GoodsAdd.vue')
      },    
      {
        meta:{
          getBread:[
            { path:'/home',title:'首页' },
            { path:'/home/goodslist',title:'商品管理' },
            { path:'/home/goodsedit',title:'商品编辑' }
          ]
        },
        path:'/home/goodsedit',
        component:() => import('../views/GoodsManager/GoodsEdit.vue')
      },
      //店铺管理
      {
        meta:{
          getBread:[
            { path:'/home',title:'首页' },
            { path:'/home/shopmanager',title:'店铺管理' }
          ]
        },
        path:'/home/shopmanager',
        component:() => import('../views/ShopManager.vue')
      },
      //账号管理
      {
        meta:{
          getBread:[
            { path:'/home',title:'首页' },
            { path:'/home/accountlist',title:'账号管理' },
            { path:'/home/accountlist',title:'账号列表' }
          ]
        },
        path:'/home/accountlist',
        component:() => import('../views/AccountManager.vue/AccountList.vue')
      },
      {
        meta:{
          getBread:[
            { path:'/home',title:'首页' },
            { path:'/home/accountlist',title:'账号管理' },
            { path:'/home/accountadd',title:'账号添加' }
          ]
        },
        path:'/home/accountadd',
        component:() => import('../views/AccountManager.vue/AccountAdd.vue')
      },
      {
        meta:{
          getBread:[
            { path:'/home',title:'首页' },
            { path:'/home/accountlist',title:'账号管理' },
            { path:'/home/modeifypassword',title:'密码修改' }
          ]
        },
        path:'/home/modeifypassword',
        component:() => import('../views/AccountManager.vue/ModifyPassword.vue')
      },
      //销售统计
      {
        meta:{
          getBread:[
            { path:'/home',title:'首页' },
            { path:'/home/shoptotal',title:'销售统计' },
            { path:'/home/shoptotal',title:'商品统计' }
          ]
        },
        path:'/home/shoptotal',
        component:() => import('../views/SaleTotal/ShopTotal.vue')
      },
      {
        meta:{
          getBread:[
            { path:'/home',title:'首页' },
            { path:'/home/shoptotal',title:'销售统计' },
            { path:'/home/ordertotal',title:'订单统计' }
          ]
        },
        path:'/home/ordertotal',
        component:() => import('../views/SaleTotal/OrderTotal.vue')
      },
      //个人中心
      {
        meta:{
          getBread:[
            { path:'/home',title:'首页' },
            { path:'/home/personal',title:'个人首页' }
          ]
        },
        path:'/home/personal',
        component:() => import('../views/Personal.vue')
      },
      
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
