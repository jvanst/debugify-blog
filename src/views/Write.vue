<template>
  <v-container fluid style="max-width:1000px" class="mx-auto">
    <v-card class="mb-3">
      <v-text-field
        v-model="title"
        label="Solo"
        placeholder="Post Title"
        solo
        hide-details
        flat
      ></v-text-field>
    </v-card>
    <v-card> <editor :value="contentHTML" v-on:input="input" /> </v-card>
    <v-layout>
      <v-flex xs6 class="text-xs-left"> </v-flex>
      <v-flex xs6 class="text-xs-right">
        <v-btn
          class="primary mr-0 mt-3"
          @click.native="publish()"
          :loading="loading"
          >Publish</v-btn
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import Editor from "@/components/Editor.vue";
import "@/assets/css/snow.css";

@Component({
  components: {
    Editor
  }
})
export default class Write extends Vue {
  title: string = "";
  contentHTML: string = "";
  contentPlain: string = "";
  headerImage: string = "";
  editor: any;

  @State(state => state.post.loading)
  loading!: boolean;

  @Action("post/createPost") createPost: any;

  publish() {
    this.createPost({
      title: this.title,
      contentHTML: this.contentHTML,
      short_description: this.contentPlain.substring(0, 60),
      header_image: this.headerImage
    });
  }
  input(e) {
    this.contentHTML = e.html;
    this.contentPlain = e.text;
  }
  upload(e) {
    this.headerImage = e;
  }
}
</script>
