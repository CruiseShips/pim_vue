import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

import axios from "axios";

const app = createApp(App);

axios.defaults.baseURL = "http://localhost:8080/";
// Vue 3 需要使用这个方式进行挂载
app.config.globalProperties.$axios = axios;
app.config.productionTip = false;

// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    //如果未匹配到路由
    from.path ? next({ path: from.path }) : next("/"); //如果上级也未匹配到路由则跳转主页面，如果上级能匹配到则转上级路由
  }
  if (to.meta.requireAuth) {
    if (window.localStorage.getItem("token")) {
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
app.use(ElementPlus);
// 项目挂载
app.mount("#app");
