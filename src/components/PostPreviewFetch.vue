<template>
  <div>
    <slot v-if="loading" name="loading"></slot>
    <slot v-else name="posts" :posts="posts"></slot> 
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State, Action } from "vuex-class";

@Component
export default class PostPreviewFetch extends Vue {
  @State(state => state.post.posts)
  posts: any;

  @State(state => state.post.loading)
  loading: any;

  @Action("post/fetchPosts") fetchPosts: any;

  created() {
    this.fetchPosts();
  }
}
</script>
