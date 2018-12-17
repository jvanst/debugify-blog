<template>
  <v-card class="mb-3" :to="`/post/${post.id}`" :href="`/post/${post.id}`">
    <v-responsive
      height="100px"
      max-height="100px"
      max-width="1000px"
      ref="headerImage"
    >
      <img
        v-lazy="`sample`"
        alt="header_image"
        style="width: 100%;"
        height="100px"
      />
    </v-responsive>
    <v-card-title class="headline pb-2">
      {{ post.title }}
      <v-spacer />
      <span class="caption">
        <i>{{ new Date(post.date).toLocaleString() }}</i>
      </span>
    </v-card-title>
    <v-card-title class="pt-0 pb-0"> By James </v-card-title>
    <v-card-text> {{ post.short_description }} </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State } from "vuex-class";
import { UserState } from "@/store/types";

@Component({})
export default class PostPreview extends Vue {
  @Prop({
    default: {
      id: Number,
      uid: String,
      title: String,
      author: String,
      short_description: String
    }
  })
  post!: Object;

  @State(state => state.user)
  user!: UserState;

  @State(state => state.dark)
  dark!: Boolean;
}
</script>
