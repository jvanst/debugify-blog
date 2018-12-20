import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "./types";
import user from "./user";
import post from "./post";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    dark: localStorage.dark === "true"
  },
  mutations: {
    setDark(state, value) {
      state.dark = value;
      localStorage.setItem("dark", JSON.stringify(!!value));
    }
  },
  modules: {
    user,
    post
  }
};

export default new Vuex.Store<RootState>(store);
