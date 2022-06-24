import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入重置样式
import '@/assets/css/global.css'
// 引入vant样式
import 'vant/lib/button/style';
// 引入vant组件
import './vant'
// 引入字体图标样式
import '@/assets/image/home/font-icon/iconfont.css'

// 全局引用并使用轮播图组件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

// 引入并挂载http请求
import http from './http'
Vue.prototype.$http = http

// 定义全局混入
Vue.mixin({
  methods: {
    // 判断是否登录
    async isLogin() {
      const userId = window.localStorage.getItem("userId");
      const WebToken = window.localStorage.getItem("WebToken");
      // 先判断userId与token是否存在,或者userId是否伪造
      if (!userId || !WebToken || userId.length !== 24) {
        this.$toast({
          type: "fail",
          message: "请先登录",
          duration: 3000,
        });
        // 清除token
        window.localStorage.removeItem('WebToken')
        // 清除userId
        window.localStorage.removeItem('userId')
        // 保存跳转前所处页面路径
        window.localStorage.setItem("fromPath", this.$route.fullPath);
        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
        return false
      }
      // 判断userId与token是否伪造
      // 这里如果userId是伪造，不会返回Ok，如果token是伪造，会返回401错误，由http拦截处理
      const { data } = await this.$http.get(`/userInfo/${userId}`)
      if (data.status !== 'Ok') {
        this.$toast({
          type: "fail",
          message: "请先登录",
          duration: 3000,
        });
        // 清除token
        window.localStorage.removeItem('WebToken')
        // 清除userId
        window.localStorage.removeItem('userId')
        // 保存跳转前所处页面路径
        window.localStorage.setItem("fromPath", this.$route.fullPath);
        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
        return false
      }
      return true;
    },
  }
})

// 定义全局过滤器
import { date } from './filter/dateFormate'
Vue.filter('date', date)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')