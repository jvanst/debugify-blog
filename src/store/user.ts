import { Module, GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState, UserState } from "./types";
import { DocumentData } from "firebase/firestore";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import router from "@/router";
import snackbar from "@/plugins/snackbar";

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    mutations.setUser(state, {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    });
    mutations.setLoggedIn(state, true);
    firebase
      .firestore()
      .collection("user")
      .doc(user.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          const data: DocumentData = doc.data();
          mutations.setPermission(state, data.permission);
        } else {
          firebase
            .firestore()
            .collection("user")
            .doc(user.uid)
            .set({ permission: 20 });
          mutations.setPermission(state, 20);
        }
      });
  } else {
    mutations.setUser(state, {
      uid: "",
      displayName: "",
      email: "",
      photoURL: "",
      isLoggedIn: false
    });
    mutations.setLoggedIn(state, false);
    mutations.setPermission(state, 0);
  }
});

const state: UserState = {
  uid: "",
  displayName: "",
  email: "",
  isLoggedIn: false,
  loading: false,
  photoURL: "",
  permission: 0
};

const getters: GetterTree<UserState, RootState> = {};

const actions: ActionTree<UserState, RootState> = {
  login({ commit }, payload): any {
    commit("setLoading", true);
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() =>
        firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password)
          .then(ret => {
            if (ret.user) {
              commit("setLoading", false);
              router.push("/");
              snackbar.showSnackbar(
                `Welcome ${ret.user.displayName}!`,
                "success"
              );
            }
          })
      )
      .catch(err => {
        snackbar.showSnackbar(err.message, "error");
        commit("setLoading", false);
      });
  },
  loginWithGoogle({ commit }): any {
    commit("setLoading", true);
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() =>
        firebase
          .auth()
          .signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then(ret => {
            if (ret.user) {
              commit("setLoading", false);
              router.push("/");
              snackbar.showSnackbar(
                `Welcome ${ret.user.displayName}!`,
                "success"
              );
            }
          })
      )
      .catch(err => {
        snackbar.showSnackbar(err.message, "error");
        commit("setLoading", false);
      });
  },
  loginWithFacebook({ commit }): any {
    commit("setLoading", true);
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(ret => {
        if (ret.user) {
          commit("setLoading", false);
          router.push("/");
          snackbar.showSnackbar(`Welcome ${ret.user.displayName}!`, "success");
        }
      })
      .catch(err => {
        snackbar.showSnackbar(err.message, "error");
        commit("setLoading", false);
      });
  },
  logout({ commit }) {
    firebase.auth().signOut();
    snackbar.showSnackbar("You were logged out.", "info");
  },
  register({ commit }, payload): any {
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
  }
};

const mutations: MutationTree<UserState> = {
  setUser(state, payload) {
    state.uid = payload.uid;
    state.displayName = payload.displayName;
    state.email = payload.email;
    state.photoURL = payload.photoURL;
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
