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
        import("./views/Single.vue")
    },
    {
      path: "/write",
      name: "write",
      component: () =>
        import("./views/Write.vue")
    },
    {
      path: "/edit/:id",
      name: "edit",
      props: true,
      component: () =>
        import("./views/Edit.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import("./views/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import("./views/Register.vue")
    },
    {
      path: "/recover",
      name: "recover",
      component: () =>
        import("./views/Recover.vue")
    }
  ]
});
