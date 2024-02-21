import { createRouter, createWebHistory } from "vue-router";
import App from "@/App.vue";
import ToDoApp from "@/pages/ToDoApp.vue";
import Landing from "@/pages/Landing.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Landing,
    },
    {
      path: "/app",
      component: ToDoApp,
    },
  ],
  linkActiveClass: "active",
});
