<template>
  <div>
    <slot v-if="loading" name="loading"></slot>
    <slot v-else name="post" :post="post"></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State, Getter, Action } from "vuex-class";

@Component
export default class PostFetch extends Vue {
  @Prop() id!: string;

  @State(state => state.post.loading)
  loading: any;

  @State(state => state.post.posts)
  posts: any;

  @Action("post/fetchPost") fetchPost: any;

  get post() {
    return this.posts[this.id];
  }

  created() {
    this.fetchPost(this.id);
  }
}
</script>
