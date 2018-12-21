import Vue from "vue";
import vueLazy from "vue-lazyload";

Vue.use(vueLazy, {
  preLoad: 1.3,
  filter: {
    size(listener, options) {
      listener.src = `w_${listener.el.offsetWidth},h_${
        listener.el.offsetHeight
      },c_fill/${listener.src}`;
    },
    webp(listener, options) {
      if (!options.supportWebp) return;
      const isCDN = /res.cloudinary.com/;
      if (isCDN.test(listener.src)) {
        listener.src += ".webp";
      }
    },
    domain(listener, options) {
      listener.src = `https://res.cloudinary.com/debugify/image/upload/${
        listener.src
      }`;
      return;
    }
  }
});
