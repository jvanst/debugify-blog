<template>
  <v-app :dark="dark">
    <toolbar/>
    <v-content>
      <keep-alive include="Home">
        <router-view />
      </keep-alive>
    </v-content>
    <snackbar/>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action, Mutation } from "vuex-class";

import Toolbar from "@/components/Toolbar.vue";
import Snackbar from "@/components/Snackbar.vue";
import firebase from "@/firebase";

@Component({
  components: {
    Toolbar,
    Snackbar
  }
})
export default class App extends Vue {
  title: string = "Blog";

  @State(state => state.dark)
  dark!: Boolean;

  @Action("user/getPermission") getPermission: any;

  @Mutation("user/setUser") setUser: any;
  @Mutation("user/setPermission") setPermission: any;
  @Mutation("user/setLoggedIn") setLoggedIn: any;

  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setUser({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        });
        this.setLoggedIn(true);
        this.getPermission();
      } else {
        this.setUser({
          displayName: "",
          email: "",
          photoURL: "",
          isLoggedIn: false
        });
        this.setLoggedIn(false);
        this.setPermission(0);
      }
    });
  }
}
</script>
