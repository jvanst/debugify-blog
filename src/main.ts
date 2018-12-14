import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/vue-lazy-load";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "@/assets/css/snow.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
// import "roboto-fontface/css/roboto/roboto-fontface.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// Register Service Worker
if (process.env.NODE_ENV === "production") {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js");
    });
  }
}
