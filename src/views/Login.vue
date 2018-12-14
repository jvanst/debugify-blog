<template>
  <v-container fill-height>
    <v-layout wrap align-center justify-center style="max-width:500px;margin:auto">
      <v-flex>
        <v-card class="pa-4">
          <v-layout wrap>
            <v-flex xs12 class="text-xs-center">
              <v-layout wrap>
                <v-flex xs12>
                  <v-form class="pb-2">
                    <v-text-field
                      label="Email"
                      type="email"
                      name="email"
                      v-model="email"
                      :disabled="user.loading"
                      @keyup.enter="login({ email, password })"
                    ></v-text-field>
                    <v-text-field
                      label="Password"
                      type="password"
                      name="password"
                      v-model="password"
                      :disabled="user.loading"
                      @keyup.enter="login({ email, password })"
                    ></v-text-field>
                    <v-btn
                      dark
                      block
                      class="mt-3"
                      @click.native="login({ email, password })"
                      :loading="user.loading"
                    >
                      Login
                    </v-btn>
                  </v-form>
                </v-flex>
                <v-flex xs12 class="pt-3 pb-3 mt-3">
                  <div
                    :style="dark ? 'border-bottom: 1px solid rgba(255,255,255,0.7);' : 'border-bottom: 1px solid #212121;'"
                    style="height: 12px; text-align: center"
                    >
                    <span
                      :class="{ 'white grey--text text--darken-4' : !dark, 'grey darken-3 grey--text text--lighten-2' : dark }"
                      class="subheading pr-3 pl-3"
                      >
                      Sign in With
                    </span>
                  </div>
                </v-flex>
                <v-flex xs6 class="pr-1">
                  <v-btn
                    block
                    dark
                    color="red lighten-1 white--text"
                    @click.native="loginWithGoogle()"
                  >
                    <img
                      :src="require('@/assets/image/google.svg')"
                      width="30px"
                      height="30px"
                      />
                  </v-btn>
                </v-flex>
                <v-flex xs6 class="pl-1">
                  <v-btn
                    block
                    color="blue white--text"
                    @click.native="loginWithFacebook()"
                  >
                    <img
                      :src="require('@/assets/image/facebook-box.svg')"
                      width="30px"
                      height="30px"
                      />
                  </v-btn>
                </v-flex>
                <v-flex xs12>
                  <div
                    :style="dark ? 'border-bottom: 1px solid rgba(255,255,255,0.7);' : 'border-bottom: 1px solid #212121;'"
                    style="height: 12px; text-align: center"
                    ></div>
                </v-flex>
                <v-flex xs12 class="pt-4">
                  <router-link
                    to="/register"
                    class="pr-2"
                    :class="{ 'black--text': !dark, 'white--text': dark }"
                  >Need an Account?</router-link>
                  <router-link
                    to="/recover"
                    class="pl-2"
                    :class="{ 'black--text': !dark, 'white--text': dark }"
                  >Forgot your password?</router-link>
                </v-flex>
              </v-layout>
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

@Component
export default class Login extends Vue {
  email: String = "";
  password: String = "";

  @State(state => state.user)
  user!: UserState;

  @State(state => state.dark)
  dark!: Boolean;

  @Action("user/login") login: any;
  @Action("user/loginWithGoogle") loginWithGoogle: any;
  @Action("user/loginWithFacebook") loginWithFacebook: any;
}
</script>
