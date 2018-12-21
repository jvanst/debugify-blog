<template>
  <div class="about">
    <v-container id="post-container">
      <v-card class="pa-3">
        <v-card-title class="title pb-0">
          What is Debugify?
        </v-card-title>
        <v-card-text>
          Debugify is blogging software which I (James Vansteenkiste) wrote in my spare time to better my understanding of the web, PWA's and TypeScript. <br>
          Debugify is open-source and free for commercial use. 
        </v-card-text>
        <v-card-title class="title pb-0">
          What language/libraries is Debugify written with?
        </v-card-title>
        <v-card-text>
          Debugify uses a bunch of technology:<br><br>
          - <a href="https://vuejs.org/">VueJS</a> for responsiveness and SPA<br>
          - <a href="https://vuetifyjs.com">VuetifyJS</a> for design<br>
          - <a href="https://firebase.google.com">Firebase</a> for authentication and noSQL database<br>
          - <a href="https://cloudinary.com">Cloudinary</a> for image hosting<br>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class About extends Vue {}
</script>
