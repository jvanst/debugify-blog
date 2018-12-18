<template>
  <v-card class="mb-3">
    <v-responsive
      height="250px"
      max-height="250px"
      max-width="1000px"
      ref="headerImage"
    >
      <img
        v-lazy="post.header_image"
        alt="header_image"
        style="width: 100%;"
        height="250px"
      />
    </v-responsive>
    <v-card-title class="display-1 pb-2">
      {{ post.title }}
      <v-spacer />
      <span class="caption">
        <i>{{ new Date(post.date).toLocaleString() }}</i>
      </span>
    </v-card-title>
    <v-card-text class="pa-1 pl-3">
      <v-layout row>
        <v-flex xs6>
          <v-avatar slot="activator" size="26px">
            <v-icon size="26px">account_circle</v-icon>
          </v-avatar>
          <span class="pl-2">{{ post.author }}</span>
        </v-flex>
        <v-flex xs6 class="text-xs-right">
          <router-link v-if="post.uid === user.uid" class="pr-2" :to="`/edit/${post.id}`" :href="`/edit/${post.id}`">Edit Article</router-link>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-text v-html="post.contentHTML" />
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State } from "vuex-class";
import { UserState } from "@/store/types";

@Component({})
export default class Post extends Vue {
  @Prop({
    default: {
      uid: String,
      id: Number,
      title: String,
      author: String,
      short_description: String,
      contentHTML: String,
      header_image: String
    }
  })
  post!: Object;

  @State(state => state.user)
  user!: UserState;

  @State(state => state.dark)
  dark!: Boolean;
}
</script>
