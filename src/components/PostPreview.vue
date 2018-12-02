<template>
  <v-card
    class="mb-3"
    :to="`/post/${post.id}`"
    :href="`/post/${post.id}`"
    >
    <v-img 
      :src="require('@/assets/birb.jpeg')"
      height="100px"
      ></v-img>
    <v-card-title class="headline pb-2">
      {{ post.title }}
      <v-spacer/>
      <span class="caption">
        <i>December 1st</i>
      </span>
    </v-card-title>
    <v-card-title class="pt-0 pb-0">
      By: {{ post.author }}
    </v-card-title>
    <v-card-text>
      {{ post.short_description }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class PostPreview extends Vue {
  @Prop({
    default: {
      id: Number,
      title: String,
      author: String,
      short_description: String
    }
  })
  post!: Object;
}
</script>
