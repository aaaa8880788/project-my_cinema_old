import axios from "axios";
import router from "./router/index";

const http = axios.create({
  // baseURL: 'http://localhost:3500/admin/api'
  baseURL: process.env.VUE_APP_API_URL || "http://47.97.37.90:3900/admin/api",
});

// 添加请求拦截器，在发起请求时加上token请求头，除了登录和注册接口其他都要
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    // console.log(token);
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截处理
// 如果返回的接口数据中，状态码为401，说明token过期或失效，则需要清除浏览器中缓存的token
http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(err);
    // 获取错误状态码，token失效
    const { status } = err.response;
    if (status == 401) {
      // Vue.$messgae('token失效，请重新登录')
      // 清除token
      localStorage.removeItem("token");

      // 重新跳转到login页面
      router.push("/login");
    }

    return Promise.reject(err);
  }
);

export default http;
