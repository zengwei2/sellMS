import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入重置样式 reset.css
import './assets/css/reset.css';
// 引入iconfont字体图标库
import './assets/fonts/iconfont.css';

// 引入element-ui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入echarts插件
import echarts from 'echarts'
Vue.prototype.$echarts = echarts; //将其挂载到vue的原型上

//引入moment时间格式化插件
import moment from 'moment';

//引用本地缓存
import local from '@/utils/local';

//挂载到vue的实例对象上 -- 格式化时间
Vue.prototype.formatTime = (dataStr,pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(dataStr).format(pattern)
}

/* 路由守卫 */
router.beforeEach((to,from,next) => {
    let token = window.localStorage.getItem('token');

    if(token){
      next()  //放行
    }else{
      if(to.path === '/login'){
        next() //放行
      }else{
        next('/login') // 跳转到登录页面
      }
    }
})

// 路由传值 v-bus
let bus = new Vue(); //声明空的vue实例对象
Vue.prototype.$bus = bus; //挂载到vue原型上


// 注册element-ui组件
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
