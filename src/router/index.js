import { createRouter, createWebHistory } from "vue-router";
import Login from "@/Login";
import Index from "@/views/Index";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/index",
    name: "Index",
    component: Index
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
