<template>
  <v-container fill-height fluid class="pa-0">
    <v-layout wrap align-center justify-center style="max-width:500px;margin:auto">
      <v-flex>
        <v-card>
          <v-card-title>
            <span class="headline pl-3 pt-3">Register</span>
          </v-card-title>
          <v-layout wrap class="pr-4 pl-4 pb-4">
            <v-flex xs12 class="pl-2 pr-2">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  label="Email"
                  type="email"
                  name="email"
                  v-model="email"
                  :rules="emailRules"
                  :disabled="user.loading"
                  ></v-text-field>
                <v-text-field
                  label="Password"
                  type="password"
                  name="password"
                  v-model="password"
                  :rules="passwordRules"
                  :disabled="user.loading"
                  ></v-text-field>
                <v-text-field
                  label="Confirm Password"
                  type="password"
                  name="password"
                  v-model="passwordConfirm"
                  :rules="passwordConfirmRules"
                  :disabled="user.loading"
                  ></v-text-field>
                <v-text-field 
                  label="Display Name"
                  type="text"
                  name="display name"
                  v-model="displayName"
                  :rules="nameRules"
                  :disabled="user.loading"
                  ></v-text-field>
              </v-form>
            </v-flex>
            <v-flex class="pt-3 pl-2">
              <router-link
                to="/login"
                :class="{ 'black--text': !dark, 'white--text': dark }"
                >Back to login</router-link>
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <v-btn
                class="primary"
                :loading="user.loading"
                @click.native="submit()"
                >Register</v-btn>
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
export default class Home extends Vue {
  email: String = "";
  password: String = "";
  passwordConfirm: String = "";
  displayName: String = "";

  valid: Boolean = true;
  emailRules: Array<any> = [
    v => !!v || "E-mail is required",
    v => /.+@.+/.test(v) || "E-mail must be valid"
  ];
  passwordRules: Array<any> = [
    v => !!v || "Password is required",
    v => (v && v.length >= 8) || "Password must be more than 8 characters"
  ];
  passwordConfirmRules: Array<any> = [
    v => !!v || "Password is required"
    // v => v === this.password || "Passwords must match"
  ];
  nameRules: Array<any> = [
    v => (v && v.length >= 3) || "Name must be a least 3 characters"
  ];

  @State(state => state.user)
  user!: UserState;

  @State(state => state.dark)
  dark!: Boolean;

  @Action("user/register") register: any;

  submit() {
    if (this.$refs.form.validate()) {
      this.register({
        email: this.email,
        password: this.password,
        displayName: this.displayName
      });
    }
  }
}
</script>
