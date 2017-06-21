// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'; // 默认主题
import './style/common.scss'; //重置样式
import './common/js/http.js'; //http
import './common/js/three.min.js'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;



//验证是否已登录
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('BIGDATA_PLATFORM'); 
  }
  //判断进入的页面需不需要登录
  if (to.matched.some(res => res.meta.requireAuth)) {
    if (sessionStorage.getItem('BIGDATA_PLATFORM')) {
      next()
      return false;
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})


/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');