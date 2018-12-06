<template>
  <div class="single">
    <v-container id="post-container">
      <post-fetch :id="id">
        <template slot="loading">
          <post-loading/>
        </template>
        <template slot="post" slot-scope="{ post }">
          <post :post="post"/>              
        </template>
      </post-fetch>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action } from "vuex-class";

import Post from "@/components/Post.vue";
import PostFetch from "@/components/PostFetch.vue";
import PostLoading from "@/components/PostLoading.vue";

@Component({
  components: {
    Post,
    PostLoading,
    PostFetch
  }
})
export default class Single extends Vue {
  @Prop() id!: string;
}
</script>
