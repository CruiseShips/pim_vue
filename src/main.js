import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "dayjs/locale/zh-cn";
import locale from "element-plus/lib/locale/lang/zh-cn"

import axios from "axios";

const app = createApp(App);

axios.defaults.baseURL = "http://localhost:8080/";
// Vue 3 需要使用这个方式进行挂载
app.config.globalProperties.$axios = axios;
app.config.productionTip = false;

// 给每一个中 header 添加我们的token
axios.interceptors.request.use(config => {
  const token = window.sessionStorage.getItem("token");
  if(token != null) {
    config.headers.token = token;
  }
  return config;
});

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
