import { createRouter, createWebHistory } from "vue-router";
import Landing from "@/pages/Landing.vue";
import ToDoApp from "@/pages/ToDoApp.vue";
import About from "@/pages/About.vue";
import Contact from "@/pages/Contact.vue";

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
    {
      path: "/about",
      component: About,
    },
    {
      path: "/contact",
      component: Contact,
    },
  ],
  linkActiveClass: "font-bold",
});
