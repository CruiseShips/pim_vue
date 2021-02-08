import { createRouter, createWebHistory } from "vue-router";
import Login from "@/Login";
import AppIndex from "@/components/sys/AppIndex";

import Index from "@/components/features/index/Index";

// 用户
import User from "@/components/features/user/User";
import Bank from "@/components/features/user/Bank";

// 管理员
import Manage from "@/components/features/manage/Manage";

// 消息
import Notice from "@/components/features/notice/Notice";

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
        path: "/manage",
        component: Manage,
        name: "Manage",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/notice",
        component: Notice,
        name: "Notice",
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
