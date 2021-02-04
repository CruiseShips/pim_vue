import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "dayjs/locale/zh-cn";
import locale from "element-plus/lib/locale/lang/zh-cn";

import axios from "axios";
import Message from "element-plus/lib/el-message";

const app = createApp(App);

axios.defaults.baseURL = "http://localhost:8080/";
// Vue 3 需要使用这个方式进行挂载
app.config.globalProperties.$axios = axios;
app.config.productionTip = false;

// 给每一个中 header 添加我们的token
axios.interceptors.request.use(config => {
  const token = window.sessionStorage.getItem("token");
  if (token != null) {
    config.headers.token = token;
  }
  return config;
});

// axios 全局超时时间
axios.defaults.timeout = 2000;

// 统一返回拦截器，用于判断是否登录，或者登录超时等，页面跳转
axios.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code === 500) {
      Message({
        message: res.msg,
        type: "error"
      });
    }
    if (res.code === 4001 || res.code === 4002 || res.data === 4000) {
      window.sessionStorage.clear();
      Message({
        message: "登录超时，请从新登录",
        type: "error"
      });
      throw new Error("登录超时，请从新登录，状态码：" + res.code);
    }
    if (res.code === 401) {
      // 等待实现
    }
    return res;
  },
  error => {
    Message({
      message: "系统错误，请联系管理员!" + error,
      type: "error"
    });
  }
);

// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    //如果未匹配到路由
    from.path ? next({ path: from.path }) : next("/"); //如果上级也未匹配到路由则跳转主页面，如果上级能匹配到则转上级路由
  }
  if (to.meta.requireAuth) {
    if (window.sessionStorage.getItem("token")) {
      next();
    } else {
      next({
        path: "login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});

// 缓存
app.use(store);
// 路由
app.use(router);
// Element Plus
app.use(ElementPlus, { locale });
// 项目挂载
app.mount("#app");
