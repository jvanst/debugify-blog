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
    <div class="pa-2">
      <v-card-title class="display-1 pl-3 pt-3 pb-2">
        {{ post.title }}
      </v-card-title>
      <v-list two-line dense class="transparent">
        <v-list-tile>
          <v-list-tile-avatar>
            <v-avatar slot="activator" size="38px">
              <v-icon size="38px">account_circle</v-icon>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title> {{ post.author }} </v-list-tile-title>
            <v-list-tile-sub-title>
              {{ new Date(post.date).toLocaleString() }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <router-link v-if="post.uid === user.uid || user.permission === 100" class="pr-2" :to="`/edit/${post.id}`" :href="`/edit/${post.id}`">Edit Article</router-link>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-card-text v-html="post.contentHTML" />
    </div>
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
