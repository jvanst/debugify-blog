<template>
  <v-card class="mb-3">
    <v-img 
      :src="require('@/assets/birb.jpeg')"
      max-height="250px"
    >
      <v-layout v-if="post.uid === user.uid || user.permission === 100">
        <v-flex class="text-xs-right">
          <v-btn :to="`/edit/${post.id}`">Edit <v-icon right>create</v-icon></v-btn>
        </v-flex>
      </v-layout>
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
    <v-card-text v-html="post.contentHTML"/>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State } from "vuex-class";
import { UserState } from "@/store/types";

@Component
export default class Post extends Vue {
  @Prop({
    default: {
      uid: String,
      id: Number,
      title: String,
      author: String,
      short_description: String,
      contentHTML: String
    }
  })
  post!: Object;

  @State(state => state.user)
  user!: UserState;
}
</script>
