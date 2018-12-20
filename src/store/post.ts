import { Module, GetterTree, ActionTree, MutationTree } from "vuex";
import { QuerySnapshot } from "firebase/firestore";
import { RootState, PostState, Post } from "./types";

import firebase from "firebase/app";
import "firebase/firestore";

import router from "@/router";
import snackbar from "@/plugins/snackbar";

firebase.firestore().settings({ timestampsInSnapshots: true });

const state: PostState = {
  posts: {},
  snapshot: null,
  loading: false
};

const getters: GetterTree<PostState, RootState> = {};

const actions: ActionTree<PostState, RootState> = {
  fetchPost({ commit }, id: string) {
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

    Promise.all([fetchContent.get(), fetch.get()])
      .then(([content, post]: Array<QuerySnapshot>) => {
        let newPost = post.data();
        newPost.id = post.id;
        newPost.contentHTML = content.data().value;
        commit("addPost", newPost);
      })
      .catch(err => snackbar.showSnackbar(err.message, "error"))
      .finally(() => commit("setLoading", false));
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
      return fetch
        .get()
        .then(snapshot => {
          commit("setSnapshot", snapshot);
          commit("addPosts", snapshot);
        })
        .catch(err => snackbar.showSnackbar(err.message, "error"))
        .finally(() => commit("setLoading", false));
    } else {
      return fetch
        .startAt(state.snapshot.docs[state.snapshot.docs.length - 1]) // Start at last fetched doc
        .get()
        .then(snapshot => {
          commit("setSnapshot", snapshot);
          commit("addPosts", snapshot);
        })
        .catch(err => snackbar.showSnackbar(err.message, "error"))
        .finally(() => commit("setLoading", false));
    }
  },
  createPost({ commit }, payload: Post) {
    const post = payload;
    const user = firebase.auth().currentUser;

    if (!(user && user.uid && user.displayName)) {
      snackbar.showSnackbar("Please login to create a post", "warning");
      return;
    }

    commit("setLoading", true);

    return firebase
      .firestore()
      .collection("posts")
      .add({
        uid: user.uid,
        title: payload.title,
        short_description: payload.short_description,
        header_image: payload.header_image,
        author: user.displayName
      })
      .then(ret => {
        post.id = ret.id;
        commit("addPost", post);
        return post.id;
      })
      .then(id =>
        firebase
          .firestore()
          .collection("posts")
          .doc(id)
          .collection("content")
          .doc("html")
          .set({
            value: payload.contentHTML
          })
      )
      .then(() => {
        commit("setLoading", false);
        router.push(`/post/${post.id}`);
        snackbar.showSnackbar("Your post was submitted", "success");
      })
      .catch(err => snackbar.showSnackbar(err.message, "error"))
      .finally(() => commit("setLoading", false));
  },
  updatePost({ state, commit }, id) {
    commit("setLoading", true);
    return firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .update({
        title: state.posts[id].title,
        short_description: state.posts[id].short_description,
        header_image: state.posts[id].header_image,
        photo_credit: state.posts[id].photo_credit
      })
      .then(() =>
        firebase
          .firestore()
          .collection("posts")
          .doc(id)
          .collection("content")
          .doc("html")
          .set({
            value: state.posts[id].contentHTML
          })
      )
      .catch(err => snackbar.showSnackbar(err.message, "error"))
      .finally(() => {
        commit("setLoading", false);
        snackbar.showSnackbar("Your post was saved", "success");
      });
  },
  deletePost({ commit }, id: string) {
    commit("setLoading", true);
    return firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        commit("setLoading", false);
      })
      .catch(err => snackbar.showSnackbar(err.message, "error"))
      .finally(() => commit("setLoading", false));
  }
};

const mutations: MutationTree<PostState> = {
  updatePost(state, post: Post) {
    Object.keys(post).forEach(key => {
      if (key in state.posts[post.id]) {
        state.posts[post.id][key] = post[key];
      }
    });
  },
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
