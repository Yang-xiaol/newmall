import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import Toast from "components/common/toast/index";

import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false

//创建事件总线
Vue.prototype.$bus = new Vue()
//添加toast插件
Vue.use(Toast)
//解决移动端300毫秒延迟 fastclick方案
FastClick.attach(document.body)

//使用懒加载
Vue.use(VueLazyload,{
  loading: require('./assets/img/common/aLong.jpg')
})

//创建Vue实例
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
