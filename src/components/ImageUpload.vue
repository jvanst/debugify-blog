<template>
  <div>
    <v-btn
      dark
      class="ml-0 mt-3"
      >
      <div
        v-if="image"
        @click="remove()"
        >
        {{image.name}}
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

@Component
export default class ImageUpload extends Vue {
  @Prop() image!: any;

  upload(e) {
    this.$emit("upload", e.target.files[0]);
  }
  remove() {
    this.$emit("upload", "");
  }
}
</script>
