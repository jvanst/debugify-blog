<template>
  <div>
    <v-btn
      dark
      class="ml-0 mt-3"
      :loading="loading"
      >
      <div
        v-if="ref"
        @click="remove()"
        >
        {{ref}}
        <v-icon right>
          close
        </v-icon>
      </div>
      <div
        v-else
        onclick="document.getElementById('file-input').click();"
        >
        Header Image
        <v-icon right>
          file_upload
        </v-icon>
      </div>
    </v-btn>
    <input
      id="file-input"
      type="file"
      @change="upload"
      accept=".jpg, .jpeg, .png"
      style="display: none;"
      />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import firebase from "firebase/app";
import "firebase/storage";

@Component
export default class ImageUpload extends Vue {
  @Prop() image!: any;
  loading: boolean = false;
  ref: string = "";

  upload(e) {
    this.loading = true;

    const self = this;
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function upload() {
      if (reader.result) {
        return firebase
          .storage()
          .ref()
          .child(`header_images/${new Date().getTime()}_${file.name}`)
          .putString(reader.result.toString(), "data_url")
          .then(ret => {
            self.loading = false;
            self.ref = ret.ref.fullPath;
            self.$emit("upload", ret.ref.fullPath);
          });
      }
      self.loading = false;
      self.$emit("upload", "");
      return false;
    };
    reader.readAsDataURL(file);
  }
  remove() {
    this.loading = true;

    const self = this;

    firebase
      .storage()
      .ref()
      .child(self.ref)
      .delete()
      .then(() => {
        self.loading = false;
        self.ref = "";
        self.$emit("upload", "");
      });
  }
}
</script>
