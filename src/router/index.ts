import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    meta: {layout: "main", auth: true},
    component: () => import("../views/Home.vue")
  },
  {
    path: "/login",
    name: "login",
    meta: {layout: "empty"},
    component: () => import("../views/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    meta: {layout: "empty"},
    component: () => import("../views/Register.vue")
  },
  {
    path: "/categories",
    name: "categories",
    meta: {layout: "main", auth: true},
    component: () => import("../views/Categories.vue")
  },
  {
    path: "/detail/:id",
    name: "detail-record",
    meta: {layout: "main", auth: true},
    component: () => import("../views/DetailRecord.vue")
  },
  {
    path: "/history",
    name: "history",
    meta: {layout: "main", auth: true},
    component: () => import("../views/History.vue")
  },
  {
    path: "/planning",
    name: "planning",
    meta: {layout: "main", auth: true},
    component: () => import("../views/Planning.vue")
  },
  {
    path: "/profile",
    name: "profile",
    meta: {layout: "main", auth: true},
    component: () => import("../views/Profile.vue")
  },
  {
    path: "/record",
    name: "record",
    meta: {layout: "main", auth: true},
    component: () => import("../views/Record.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
