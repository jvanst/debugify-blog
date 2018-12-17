<template>
  <v-container fill-height>
    <v-layout
      wrap
      align-center
      justify-center
      style="max-width:500px;margin:auto"
    >
      <v-flex>
        <v-card>
          <v-card-title>
            <span class="headline pl-3 pt-3">Recover</span>
          </v-card-title>
          <v-layout wrap class="pr-4 pl-4 pb-4">
            <v-flex xs12 class="pl-2 pr-2">
              <v-text-field
                label="Email"
                type="email"
                name="email"
                color="black"
                v-model="email"
                :disabled="user.loading"
                @keyup.enter="recover(email)"
              ></v-text-field>
            </v-flex>
            <v-flex class="pt-3 pl-2">
              <router-link
                to="/login"
                :class="{ 'black--text': !dark, 'white--text': dark }"
                >Back to login</router-link
              >
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <v-btn
                class="primary"
                :loading="user.loading"
                @click.native="recover(email)"
                >Recover</v-btn
              >
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { UserState } from "@/store/types";

@Component({})
export default class Recover extends Vue {
  email: String = "";

  @State(state => state.user)
  user!: UserState;

  @State(state => state.dark)
  dark!: Boolean;

  @Action("user/recover") recover: any;
}
</script>
