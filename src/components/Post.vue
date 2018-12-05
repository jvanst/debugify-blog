<template>
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
        <i>{{ new Date(post.date).toLocaleString() }}</i>
      </span>
    </v-card-title>
    <v-card-title class="pt-0 pb-0">
      By: {{ post.author }}
    </v-card-title>
    <v-card-text v-html="post.content"/>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Post extends Vue {
  @Prop({
    default: {
      id: Number,
      title: String,
      author: String,
      short_description: String,
      content: String
    }
  })
  post!: Object;
}
</script>
