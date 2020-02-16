import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/register.vue";
import Login from "../views/Login.vue";

import Chatroom from "../views/Chatroom.vue";
// import Chatroomejs from "../views/chatroom.ejs";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/Chatroom",
    name: "Chatroom",
    component: Chatroom
  }
  // {
  //   path: "/Chatroomejs",
  //   name: "Chatroomejs",
  //   component: Chatroomejs
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
