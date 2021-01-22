import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

let axios = require("axios");

const app = createApp(App);

app.config.productionTip = false;

// 缓存
app.use(store);
// 路由
app.use(router);
// Element Plus
app.use(ElementPlus);
// 项目挂载
app.mount("#app");
