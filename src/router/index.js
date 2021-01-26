import { createRouter, createWebHistory } from "vue-router";
import Login from "@/Login";
import AppIndex from "@/views/AppIndex";
import App from "@/App";

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/app",
    name: "App",
    component: App,
    redirect: "/appIndex",
    children: [
      {
        path: "/appIndex",
        name: "AppIndex",
        component: AppIndex,
        meta: {
          requireAuth: true
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
