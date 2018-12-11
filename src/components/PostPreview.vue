<template>
  <v-card
    class="mb-3"
    :to="`/post/${post.id}`"
    :href="`/post/${post.id}`"
    >
    
    <image-fetch :imageRef="post.header_image">
      <v-card
        slot="loading"
        height="100"
        :color="dark ? 'grey darken-2' : 'grey lighten-2'"
        flat
        />
      <div slot-scope="{ imageURL }">
        <v-img 
          :src="imageURL"
          height="100px"
          >
          <v-layout v-if="post.uid === user.uid || user.permission === 100">
            <v-flex class="text-xs-right">
              <v-btn :to="`/edit/${post.id}`">Edit <v-icon right>create</v-icon></v-btn>
            </v-flex>
          </v-layout>
        </v-img>
      </div>
    </image-fetch>
    <v-card-title class="headline pb-2">
      {{ post.title }}
      <v-spacer/>
      <span class="caption">
        <i>{{ new Date(post.date).toLocaleString() }}</i>
      </span>
    </v-card-title>
    <v-card-title class="pt-0 pb-0">
      By {{ post.author }}
    </v-card-title>
    <v-card-text>
      {{ post.short_description }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State } from "vuex-class";
import { UserState } from "@/store/types";
import ImageFetch from "@/components/ImageFetch.vue";

@Component({
  components: {
    ImageFetch
  }
})
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
