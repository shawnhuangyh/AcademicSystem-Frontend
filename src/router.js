import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/Login.vue";
import Class from "@/components/admin/Class.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Login,
    },
    {
      path: "/admin/class",
      component: Class,
    },
  ],
});
