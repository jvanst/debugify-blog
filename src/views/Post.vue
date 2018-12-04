<template>
  <v-container id="post-container">
    <v-card class="mb-3">
      <v-img 
        :src="require('@/assets/birb.jpeg')"
        max-height="250px"
      >
      </v-img>
      <v-card-title class="display-1 pb-2">
        {{ post.title }}
        <v-spacer/>
        <span class="caption">
          <i>December 1st</i>
        </span>
      </v-card-title>
      <v-card-title class="pt-0 pb-0">
        By: {{ post.author }}
      </v-card-title>
      <v-card-text v-html="post.short_description"/>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action } from "vuex-class";

@Component
export default class Post extends Vue {
  @Prop() id!: Number;

  @Getter("post/byId") getById: any;

  @Action("post/fetchPost") fetchPost: any;

  get post() {
    return this.getById(this.id);
  }

  created() {
    this.fetchPost(this.id);
  }
}
</script>
