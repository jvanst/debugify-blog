<template>
  <v-container fluid style="max-width:1000px" class="mx-auto">
    <post-fetch :id="id">
      <template slot="loading">
        <post-loading />
      </template>
      <template slot="post" slot-scope="{ post }">
        <v-card flat>
          <v-text-field
            :value="post.title"
            @input="updateTitle"
            label="Post Title"
            class="mb-3"
            hide-details
            box
          ></v-text-field>
        </v-card>
        <v-card flat>
          <v-textarea 
            :value="post.short_description"
            @input="updateShortDescription"
            label="Short Description"
            class="mb-3"
            hide-details
            box
            />
        </v-card>
          <v-card flat>
            <editor :value="post.contentHTML" v-on:input="input" class="mb-3" />
          </v-card>
        <v-layout row wrap class="mt-2">
          <v-flex xs6>
            <v-card flat>
              <v-text-field
                :value="post.header_image"
                @input="updateHeaderImage"
                label="Image Header"
                class="mb-3 mr-1"
                hide-details
                box
              ></v-text-field>
            </v-card>
          </v-flex>
          <v-flex xs6>
            <v-card flat>
              <v-text-field
                :value="post.photo_credit"
                @input="updatePhotoCredit"
                label="Image Credit"
                class="mb-3 ml-1"
                hide-details
                box
              ></v-text-field>
            </v-card>
          </v-flex>
          <v-flex xs12 class="text-xs-right">
            <v-btn
              class="primary mr-0"
              @click.native="submit(id)"
              :loading="loading"
              >Save</v-btn
            >
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

@Component({
  components: {
    PostFetch,
    PostLoading,
    Editor
  }
})
export default class Edit extends Vue {
  @Prop() id!: string;
  editor: any;
  post: any;

  @State(state => state.post.loading)
  loading: any;

  @Mutation("post/updatePost") updatePost: any;
  @Action("post/updatePost") submit: any;

  updateTitle(e) {
    this.updatePost({
      id: this.id,
      title: e
    });
  }

  updateShortDescription(e) {
    this.updatePost({
      id: this.id,
      short_description: e
    });
  }

  updateHeaderImage(e) {
    this.updatePost({
      id: this.id,
      header_image: e
    });
  }

  updatePhotoCredit(e) {
    this.updatePost({
      id: this.id,
      photo_credit: e
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
