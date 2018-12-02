<template>
  <div class="home">
    <v-container id="post-container">
      <post-preview v-for="(post, index) in posts" :key="index" :post="post"/>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { Post } from "@/store/types";
import PostPreview from "@/components/PostPreview.vue";

@Component({
  components: {
    PostPreview
  }
})
export default class Home extends Vue {
  title: String = "Sample Title";

  @State(state => state.post.posts)
  posts!: Post;

  @Action("post/getPosts") getPosts: any;

  created() {
    this.getPosts();
  }
}
</script>

<style>
#post-container {
  max-width: 1000px;
}
</style>
