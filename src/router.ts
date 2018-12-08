import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/post/:id",
      name: "single",
      props: true,
      component: () =>
        import(/* webpackChunkName: "post" */ "./views/Single.vue")
    },
    {
      path: "/write",
      name: "write",
      component: () =>
        import(/* webpackChunkName: "write" */ "./views/Write.vue")
    },
    {
      path: "/edit/:id",
      name: "edit",
      props: true,
      component: () =>
        import(/* webpackChunkName: "write" */ "./views/Edit.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(/* webpackChunkName: "register" */ "./views/Register.vue")
    },
    {
      path: "/recover",
      name: "recover",
      component: () =>
        import(/* webpackChunkName: "recover" */ "./views/Recover.vue")
    }
  ]
});
