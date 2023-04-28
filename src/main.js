import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
// import VueAMap from '@vuemap/vue-amap';
// import '@vuemap/vue-amap/dist/style.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './config/rem.js'
import store from './store';
// Vue.use(VueAMap);
Vue.use(ElementUI);
// VueAMap.initAMapApiLoader({
//   key: '5de6bcc9cba7e522c046e8445afedc8d',
// });
Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
