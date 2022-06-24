import axios from "axios";
import router from "./router/index";

const http = axios.create({
  // baseURL: 'http://localhost:3500/web/api'
  baseURL: process.env.VUE_APP_API_URL || "http://47.97.37.90:3600/web/api",
});
// 添加请求拦截器，在发起请求时加上token请求头，因为用户信息接口要token
http.interceptors.request.use(
  (config) => {
    const WebToken = localStorage.getItem("WebToken");
    if (WebToken) {
      config.headers.Authorization = WebToken;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截处理
// 如果返回的接口数据中，状态码为401，说明token过期或失效，则需要清除浏览器中缓存的token和获取的用户id
http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    // 获取错误状态码，token失效
    const { status } = err.response;
    if (status == 401) {
      // 清除token
      window.localStorage.removeItem("WebToken");
      // 清除userId
      window.localStorage.removeItem("userId");
    }
    return Promise.reject(err);
  }
);

export default http;
