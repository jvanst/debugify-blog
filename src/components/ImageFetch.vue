<template>
  <div>
    <slot v-if="loading" name="loading"></slot>
    <slot v-else :imageURL="imageURL"></slot> 
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State, Getter, Action } from "vuex-class";

import firebase from "@/firebase";
import "firebase/storage";

@Component
export default class ImageFetch extends Vue {
  @Prop() imageRef!: string;
  loading: boolean = true;
  imageURL: string = "";

  created() {
    firebase
      .storage()
      .ref()
      .child(this.imageRef)
      .getDownloadURL()
      .then(ret => {
        this.loading = false;
        this.imageURL = ret;
      });
  }
}
</script>
