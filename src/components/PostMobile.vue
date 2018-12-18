<template>
  <v-layout row wrap>
    <v-flex xs12 class="pl-3 pr-3 pb-1 pt-3">
      <span class="headline">{{ post.title }}</span>
    </v-flex>
    <v-flex xs12 class="pb-1 pt-1">
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
        </v-list-tile>
      </v-list>
    </v-flex>
    <v-flex xs12>
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
    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-card-text class="text-xs-center pt-1 caption"
          >Photo by {{ post.photo_credit }}</v-card-text
        >
        <router-link v-if="post.uid === user.uid" class="pl-3" :to="`/edit/${post.id}`" :href="`/edit/${post.id}`">Edit Article</router-link>
        <v-card-text v-html="post.contentHTML" />
      </v-card>
    </v-flex>
  </v-layout>
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
      photo_credit: String,
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
