<template>
  <v-toolbar app>
    <v-toolbar-title class="pr-4"> 
      {{ title }}
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn flat to="/" href="/">
        Home
      </v-btn>
    </v-toolbar-items>
    <v-spacer/>
    <v-toolbar-items v-if="!user.isLoggedIn">
      <v-btn flat to="/login" href="/login">
        Login
      </v-btn>
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
    <v-menu
      v-if="user.isLoggedIn"
      :close-on-content-click="false"
      offset-y
      left
      :min-width="300"
      >
      <v-avatar slot="activator">
        <v-img size="44px" v-if="user.photoURL" :src="user.photoURL"/>
        <v-icon v-else size="44px">account_circle</v-icon>
      </v-avatar>
      <v-card>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-avatar slot="activator">
                <v-img size="44px" v-if="user.photoURL" :src="user.photoURL"/>
                <v-icon v-else size="44px">account_circle</v-icon>
              </v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title> {{ user.displayName }}</v-list-tile-title>
              <v-list-tile-sub-title> {{ user.email }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-tile @click.native="setDark(!dark)">
            <v-list-tile-action>
              <v-switch :value="dark"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>Dark Mode</v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-divider/>
        <v-card-actions>
          <v-btn flat disabled>
            Account
          </v-btn>
          <v-spacer/>
          <v-btn flat @click.native="logout()">
            Logout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action, Mutation } from "vuex-class";
import { UserState } from "@/store/types";

@Component
export default class App extends Vue {
  title: string = "Debugify";

  @State(state => state.user)
  user!: UserState;

  @State(state => state.dark)
  dark!: Boolean;

  @Mutation("setDark") setDark;

  @Action("user/logout") logout: any;
}
</script>
