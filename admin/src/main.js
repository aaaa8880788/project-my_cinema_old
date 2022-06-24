import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入mlement ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入字体图标
import './assets/font_q0jbzn7to7/iconfont.css'
// 引入全局样式
import './assets/global.css'
// 挂载网络请求模块
import http from './http'
Vue.prototype.$http = http

// 定义全局混入，用来给上传图片接口加请求头
Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `${window.localStorage.getItem('token') || ''}`
      }
    }
  }
})

// 定义全局时间处理过滤器
import { date } from './filter/dateFormate'
Vue.filter('date', date)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
