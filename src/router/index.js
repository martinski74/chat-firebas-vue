import { createRouter, createWebHistory } from "vue-router";
import Login from "./../components/Login.vue";
import HomeView from "./../components/HomeView.vue";

const routes = [
  { path: "/login", component: Login },
  { path: "/home", component: HomeView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
