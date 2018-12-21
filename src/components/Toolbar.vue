<template>
  <v-toolbar app>
    <v-toolbar-title class="pr-4"> {{ title }} </v-toolbar-title>
    <v-toolbar-items>
      <v-btn flat to="/" href="/"> Home </v-btn>
      <v-btn flat to="/about" href="/about"> About </v-btn>
    </v-toolbar-items>
    <v-spacer />
    <v-toolbar-items v-if="!user.isLoggedIn">
      <v-btn flat to="/login" href="/login"> Login </v-btn>
    </v-toolbar-items>
    <v-btn
      flat
      icon
      to="/write"
      href="/write"
      v-if="user.permission >= 50"
      class="mr-3"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <user-menu size="42px" v-if="user.isLoggedIn" />
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import { UserState } from "@/store/types";

import firebase from "firebase/app";
import "firebase/auth";

@Component({
  components: {
    UserMenu: () => import("@/components/UserMenu.vue")
  }
})
export default class App extends Vue {
  title: string = "Debugify";

  @State(state => state.user)
  user!: UserState;
}
</script>
