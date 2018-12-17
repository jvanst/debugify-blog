<template>
  <div class="home">
    <v-container id="post-container">
      <post-preview-fetch>
        <template slot="loading">
          <post-preview-loading
            v-for="(n, index) in 3"
            :key="`loading-${index}`"
          />
        </template>
        <template slot="posts" slot-scope="{ posts }">
          <post-preview
            v-for="(post, index) in posts"
            :key="index"
            :post="post"
          />
        </template>
      </post-preview-fetch>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import PostPreview from "@/components/PostPreview.vue";
import PostPreviewFetch from "@/components/PostPreviewFetch.vue";
import PostPreviewLoading from "@/components/PostPreviewLoading.vue";

@Component({
  components: {
    PostPreview: () =>
      import(/* webpackPreload: true */ "@/components/PostPreview.vue"),
    PostPreviewFetch: () =>
      import(/* webpackPreload: true */ "@/components/PostPreviewFetch.vue"),
    PostPreviewLoading: () =>
      import(/* webpackPreload: true */ "@/components/PostPreviewLoading.vue")
  }
})
export default class Home extends Vue {}
</script>

<style>
#post-container {
  max-width: 1000px;
}
</style>
