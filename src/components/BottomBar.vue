<template>
  <v-bottom-nav :active.sync="bottomNav" :value="true" app>
    <v-btn value="home" color="primary" to="/" exact flat>
      <span>Home</span>
      <v-icon>home</v-icon>
    </v-btn>

    <v-btn value="favorites" color="primary" to="/write" exact flat disabled>
      <span>Favorites</span>
      <v-icon>favorite</v-icon>
    </v-btn>

    <v-btn color="primary" flat disabled value="nearby">
      <span>Activity</span>
      <v-icon>history</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State } from "vuex-class";
import { UserState } from "@/store/types";

@Component({})
export default class Post extends Vue {
  bottomNav: string = "home";
}
</script>
