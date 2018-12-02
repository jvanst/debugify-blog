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
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Post extends Vue {
  post: Object = [
    {
      id: Number,
      title: String,
      short_description: String
    }
  ];

  constructor() {
    super();
    this.post = {
      id: 1,
      title: "Post Title",
      author: "James Vansteenkiste",
      short_description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eaque error
          voluptatem quam exercitationem sit possimus doloremque placeat enim porro
          accusantium, impedit aliquid at et cupiditate ad dolor expedita aperiam?`
    };
  }
}
</script>
