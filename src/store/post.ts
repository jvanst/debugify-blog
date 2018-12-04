import { Module, GetterTree, ActionTree, MutationTree } from "vuex";
import { QuerySnapshot } from "firebase/firestore";
import { RootState, PostState, Post } from "./types";

import firebase from "@/firebase";
import snackbar from "@/plugins/snackbar";

const state: PostState = {
  posts: [],
  snapshot: null,
  loading: false
};

const getters: GetterTree<PostState, RootState> = {
  byId: state => id => {
    return state.posts.find(post => post.id === id);
  }
};

const actions: ActionTree<PostState, RootState> = {
  fetchPost({ commit }, id) {
    commit("setLoading", true);

    const fetch = firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .collection("content");

    fetch.get().then(snapshot => {
      snapshot.forEach(doc => {
        // do something with content
      });
      commit("setLoading", false);
    });
  },
  fetchPosts({ state, commit }) {
    commit("setLoading", true);

    const fetch = firebase
      .firestore()
      .collection("posts")
      .orderBy("date", "desc")
      .limit(10);

    if (!state.snapshot) {
      // If first time fetching
      fetch
        .get()
        .then(snapshot => {
          commit("setSnapshot", snapshot);
          commit("setPosts", snapshot);
          commit("setLoading", false);
        })
        .catch(err => snackbar.showSnackbar(err.message, "error"));
    } else {
      fetch
        .startAt(state.snapshot.docs[state.snapshot.docs.length - 1]) // Start at last fetched doc
        .get()
        .then(snapshot => {
          commit("setSnapshot", snapshot);
          commit("setPosts", snapshot);
          commit("setLoading", false);
        })
        .catch(err => snackbar.showSnackbar(err.message, "error"));
    }
  }
};

const mutations: MutationTree<PostState> = {
  setLoading(state, payload: Boolean) {
    state.loading = payload;
  },
  setPosts(state, snapshot: QuerySnapshot) {
    snapshot.forEach(doc => {
      const post = doc.data();
      post.id = doc.id;
      console.log(post);
      state.posts.push(post);
    });
  },
  setSnapshot(state, snapshot: QuerySnapshot) {
    state.snapshot = snapshot;
  }
};

const post: Module<PostState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default post;
