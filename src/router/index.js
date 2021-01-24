import { createRouter, createWebHistory } from "vue-router";
import Login from "@/Login";
import Index from "@/views/Index";
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
    path: '/app',
      name: 'App',
      component: App,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'Index',
          component: Index,
          meta: {
            requireAuth: true
          }
        }
      ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
