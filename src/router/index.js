import { createRouter, createWebHistory } from "vue-router";
import Login from "@/Login";
import AppIndex from "@/components/sys/AppIndex";

import Index from "@/components/features/index/Index";

// 用户
import User from "@/components/features/user/User";
import Bank from "@/components/features/user/Bank";

// 管理员
import Admin from "@/components/features/admin/Admin";

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
    path: "/appIndex",
    name: "AppIndex",
    component: AppIndex,
    meta: {
      requireAuth: true
    },
    redirect: "/index",
    children: [
      {
        path: "",
        redirect: "/index"
      },
      {
        path: "/index",
        component: Index,
        name: "Index",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/user",
        component: User,
        name: "User",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/bank",
        component: Bank,
        name: "Bank",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/admin",
        component: Admin,
        name: "Admin",
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
