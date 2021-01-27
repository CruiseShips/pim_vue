import { createRouter, createWebHistory } from "vue-router";
import Login from "@/Login";
import Home from "@/views/Home";
import AppIndex from "@/components/sys/AppIndex";

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
    path: "/home",
    name: "Home",
    component: Home,
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
