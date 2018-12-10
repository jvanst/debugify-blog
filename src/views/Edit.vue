<template>
  <v-container
    fluid
    style="max-width:1000px"
    class="mx-auto"
    >
    <post-fetch :id="id">
      <template slot="loading">
        <post-loading/>
      </template>
      <template slot="post" slot-scope="{ post }">
        <v-card class="mb-3">
          <v-text-field
            :value="post.title"
            label="Solo"
            placeholder="Post Title"
            solo
            hide-details
            @input="updateTitle"
            flat
          ></v-text-field>
        </v-card>
        <v-card>
          <editor :value="post.contentHTML" v-on:input="input" />
        </v-card>
        <v-layout class="mt-2">
          <v-flex xs6 class="text-xs-left">
            <!-- <upload-button :image="image" v-on:upload="upload"/> -->
          </v-flex>
          <v-flex xs6 class="text-xs-right">
            <v-btn
              class="primary mr-0"
              @click.native="submit(id)"
              :loading="loading"
              >Save</v-btn>
          </v-flex>
        </v-layout>
      </template>
    </post-fetch>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Action, Mutation } from "vuex-class";
import PostFetch from "@/components/PostFetch.vue";
import PostLoading from "@/components/PostLoading.vue";
import Editor from "@/components/Editor.vue";
import UploadButton from "@/components/ImageUpload.vue";

@Component({
  components: {
    PostFetch,
    PostLoading,
    Editor,
    UploadButton
  }
})
export default class Edit extends Vue {
  @Prop() id!: string;
  editor: any;
  post: any;

  @State(state => state.post.saving)
  loading: any;

  @Mutation("post/updatePost") updatePost: any;
  @Action("post/updatePost") submit: any;

  updateTitle(e) {
    this.updatePost({
      id: this.id,
      title: e
    });
  }

  input(e) {
    // this.contentHTML = e.html;
    // this.contentPlain = e.text;
    this.updatePost({
      id: this.id,
      contentHTML: e.html
    });
  }
  upload(e) {
    // this.image = e;
  }
}
</script>
