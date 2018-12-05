import { Module, GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState, UserState } from "./types";
import { DocumentData } from "firebase/firestore";

import firebase from "@/firebase";
import router from "@/router";
import snackbar from "@/plugins/snackbar";

const state: UserState = {
  displayName: "",
  email: "",
  isLoggedIn: false,
  loading: false,
  error: false,
  permission: 0
};

const getters: GetterTree<UserState, RootState> = {};

const actions: ActionTree<UserState, RootState> = {
  login({ commit, dispatch }, payload): any {
    commit("setLoading", true);
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(ret => {
        if (ret.user) {
          dispatch("getPermission");
          commit("setUser", {
            displayName: ret.user.displayName,
            email: ret.user.email,
            isLoggedIn: true
          });
          commit("setLoggedIn", true);
          commit("setLoading", false);
          router.push("/");
        }
      })
      .catch(err => {
        snackbar.showSnackbar(err.message, "error");
        commit("setLoading", false);
      });
  },
  loginWithGoogle({ commit, dispatch }): any {
    commit("setLoading", true);
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(ret => {
        if (ret.user) {
          dispatch("getPermission");
          commit("setUser", {
            displayName: ret.user.displayName,
            email: ret.user.email,
            isLoggedIn: true
          });
          commit("setLoggedIn", true);
          commit("setLoading", false);
          router.push("/");
        }
      })
      .catch(err => {
        snackbar.showSnackbar(err.message, "error");
        commit("setLoading", false);
      });
  },
  loginWithFacebook({ commit, dispatch }): any {
    commit("setLoading", true);
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(ret => {
        if (ret.user) {
          commit("setUser", {
            displayName: ret.user.displayName,
            email: ret.user.email,
            isLoggedIn: true
          });
          dispatch("getPermission");
          commit("setLoggedIn", true);
          commit("setLoading", false);
          router.push("/");
        }
      })
      .catch(err => {
        snackbar.showSnackbar(err.message, "error");
        commit("setLoading", false);
      });
  },
  logout({ commit }) {
    firebase.auth().signOut();
  },
  register({ commit, dispatch }, payload): any {
    commit("setLoading", true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        const user = firebase.auth().currentUser;
        if (user) {
          return user.updateProfile({
            displayName: payload.displayName,
            photoURL: null
          });
        }
        return;
      })
      .then(() => {
        dispatch("getPermission");
        commit("setLoading", false);
        router.push("/");
      })
      .catch(err => {
        snackbar.showSnackbar(err.message, "error");
        commit("setLoading", false);
      });
  },
  recover({ commit }, email): any {
    commit("setLoading", true);
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        commit("setLoading", false);
        router.push("/login");
      })
      .catch(err => {
        snackbar.showSnackbar(err.message, "error");
        commit("setLoading", false);
      });
  },
  getPermission({ commit }) {
    const user = firebase.auth().currentUser;
    if (user) {
      firebase
        .firestore()
        .collection("user")
        .doc(user.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            const data: DocumentData = doc.data();
            commit("setPermission", data.permission);
          } else {
            firebase
              .firestore()
              .collection("user")
              .doc(user.uid)
              .set({ permission: 20 });
            commit("setPermission", 20);
          }
        });
    }
  }
};

const mutations: MutationTree<UserState> = {
  setUser(state, payload) {
    state.displayName = payload.displayName;
    state.email = payload.email;
  },
  setLoggedIn(state, payload) {
    state.isLoggedIn = payload;
  },
  setPermission(state, payload) {
    state.permission = payload;
  },
  setLoading(state, payload) {
    state.loading = payload;
  }
};

const user: Module<UserState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default user;
