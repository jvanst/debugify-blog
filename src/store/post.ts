import { Module, GetterTree, ActionTree, MutationTree } from "vuex";
import { QuerySnapshot } from "firebase/firestore";
import { RootState, PostState, Post } from "./types";

import firebase from "@/firebase";
import snackbar from "@/plugins/snackbar";

const state: PostState = {
  posts: {},
  snapshot: null,
  loading: false
};

const getters: GetterTree<PostState, RootState> = {};

const actions: ActionTree<PostState, RootState> = {
  fetchPost({ commit }, id) {
    commit("setLoading", true);

    const fetchContent = firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .collection("content")
      .doc("html");

    const fetch = firebase
      .firestore()
      .collection("posts")
      .doc(id);

    Promise.all([fetchContent.get(), fetch.get()]).then(
      ([content, post]: Array<QuerySnapshot>) => {
        let newPost = post.data();
        newPost.id = post.id;
        newPost.content = content.data().value;
        commit("addPost", newPost);
        commit("setLoading", false);
      }
    );
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
          commit("addPosts", snapshot);
          commit("setLoading", false);
        })
        .catch(err => snackbar.showSnackbar(err.message, "error"));
    } else {
      fetch
        .startAt(state.snapshot.docs[state.snapshot.docs.length - 1]) // Start at last fetched doc
        .get()
        .then(snapshot => {
          commit("setSnapshot", snapshot);
          commit("addPosts", snapshot);
          commit("setLoading", false);
        })
        .catch(err => snackbar.showSnackbar(err.message, "error"));
    }
  }
};

const mutations: MutationTree<PostState> = {
  addPost(state, post: Post) {
    state.posts[post.id] = post;
  },
  addPosts(state, snapshot: QuerySnapshot) {
    snapshot.forEach(doc => {
      state.posts[doc.id] = doc.data();
      state.posts[doc.id].id = doc.id;
    });
  },
  setLoading(state, payload: boolean) {
    state.loading = payload;
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
