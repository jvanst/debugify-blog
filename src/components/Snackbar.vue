<template>
  <v-snackbar
    v-model="snackbarVisible"
    :color="snackbarColor"
    :multi-line="snackbarMessage.length > 68"
    bottom
    right
  >
    {{ snackbarMessage }}
    <v-btn
      dark
      flat
      icon
      @click="snackbarVisible = false"
    >
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Snackbar extends Vue {}
</script>

<style>
.v-snack__content {
  font-family: Roboto, sans-serif;
  line-height: 1.5;
}
</style>
