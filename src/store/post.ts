import { Module, GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState, PostState } from "./types";

import firebase from "@/firebase";
import snackbar from "@/plugins/snackbar";

const state: PostState = {
  posts: [],
}

const getters: GetterTree<PostState, RootState> = {};

const actions: ActionTree<PostState, RootState> = {
  getPosts() {
    firebase.firestore().collection('posts').limit(10)
      .orderBy('date', 'desc')
      .get()
      .then((querySnapshot) => {
        const docs = {};
        querySnapshot.forEach((doc) => {
          const post = doc.data();
          const lazyHeader = post.header_image;
          // If header image, Lazy load it
          if (post.header_image) {
            post.header_image_url = null;
            firebase.storage().ref().child(`header_images/${lazyHeader}`).getDownloadURL().then((url) => {
              post.header_image_url = url;
            }).catch(() => {
              post.header_image_url = 'error';
            });
          }
          post.id = doc.id;
          docs[doc.id] = post;
        });
      });
  },
};

const mutations: MutationTree<PostState> = {};

const post: Module<PostState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default post;