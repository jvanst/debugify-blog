import Vue from "vue";
import vueLazy from "vue-lazyload";

Vue.use(vueLazy, {
  adapter: {
    loaded({
      bindType,
      el,
      naturalHeight,
      naturalWidth,
      $parent,
      src,
      loading,
      error,
      Init
    }) {
      // do something here
      // example for call LoadedHandler
      // console.log(el.offsetWidth);
    },
    loading(listender, Init) {
      // console.log(listender);
      // console.log(listender.el.offsetWidth);
    },
    error(listender, Init) {
      // console.log("error");
    }
  },
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
//
