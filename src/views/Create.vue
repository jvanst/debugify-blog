<template>
  <v-container fluid class="pa-1 pt-2">
    <v-card style="max-width:1000px" class="mx-auto">
      <v-card-title class="headline">
        Create a new post
      </v-card-title>
      <v-layout row wrap class="pl-4 pr-4 pb-4">
        <v-flex xs12>
          <v-text-field name="title" label="Title" v-model="title" box></v-text-field>
        </v-flex>
        <v-flex xs12 class="py-2">
          <v-btn-toggle multiple v-model="toggle_multiple">
            <v-btn flat>
              <v-icon>format_bold</v-icon>
            </v-btn>
            <v-btn flat>
              <v-icon>format_italic</v-icon>
            </v-btn>
            <v-btn flat>
              <v-icon>format_underlined</v-icon>
            </v-btn>
            <v-btn flat>
              <v-icon>format_color_fill</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-flex>
        <v-flex xs12>
          <v-textarea name="content" box v-model="content" label="Post Content"></v-textarea>
        </v-flex>
        <v-flex xs6 class="text-xs-left">
          <v-btn flat outline class="ml-0" onclick="document.getElementById('file-input').click();">
            <div v-if="image">{{image.name}}<v-icon right>close</v-icon></div>
            <div v-else>Header Image<v-icon right>file_upload</v-icon></div>
          </v-btn>
          <input id="file-input" type="file" @change="uploadHeader" accept=".jpg, .jpeg, .png" style="display: none;"/>
        </v-flex>
        <v-flex xs6 class="text-xs-right">
          <v-btn class="primary" @click.native="publish()">Publish</v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  toggle_multiple: Array<Number> = [0, 0, 0];
  title: String = "";
  content: String = "";
  image: String = "";

  publish() {
    // do something
  }

  uploadHeader(e) {
    // do something
  }
}
</script>
