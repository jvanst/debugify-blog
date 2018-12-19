<template>
  <v-menu :close-on-content-click="false" offset-y left :min-width="300">
    <v-avatar slot="activator" :size="size">
      <v-img v-if="user.photoURL" :src="user.photoURL" />
      <v-icon v-else>account_circle</v-icon>
    </v-avatar>
    <v-card>
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-avatar slot="activator">
              <v-img v-if="user.photoURL" :src="user.photoURL" />
              <v-icon v-else>account_circle</v-icon>
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
      <v-divider />
      <v-card-actions>
        <v-btn flat disabled> Account </v-btn>
        <v-spacer />
        <v-btn flat @click.native="logout()"> Logout </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Action, Mutation } from "vuex-class";
import { UserState } from "@/store/types";

@Component
export default class UserMenu extends Vue {
  @Prop() size!: string;

  @State(state => state.user)
  user!: UserState;

  @State(state => state.dark)
  dark!: Boolean;

  @Action("user/logout") logout: any;

  @Mutation("setDark") setDark;
}
</script>
