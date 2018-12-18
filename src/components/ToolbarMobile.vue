<template>
  <v-toolbar app class="transparent" flat>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs4 class="text-xs-left" />
      <v-flex xs4 class="text-xs-center">
        <v-toolbar-title> Debugify </v-toolbar-title>
      </v-flex>
      <v-flex xs4 class="text-xs-right">
        <user-menu size="36px" v-if="user.isLoggedIn" />
        <v-btn v-else small flat to="/login" class="mr-0 mt-2"> Login </v-btn>
      </v-flex>
    </v-layout>
  </v-toolbar>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State } from "vuex-class";
import { UserState } from "@/store/types";

@Component({
  components: {
    UserMenu: () => import("@/components/UserMenu.vue")
  }
})
export default class ToolbarMobile extends Vue {
  @State(state => state.user)
  user!: UserState;
}
</script>
