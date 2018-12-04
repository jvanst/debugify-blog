<template>
  <v-card
    class="mb-3"
    flat
    >
    <v-card
      height="100"
      :color="dark ? 'grey darken-2' : 'grey lighten-2'"
      flat
      />
    <v-card
      flat
      class="pa-3"
      height="100"
      >
      <v-card
        height="20"
        :color="dark ? 'grey darken-2' : 'grey lighten-2'"
        flat
        />
      <v-card
        height="30"
        :color="dark ? 'grey darken-2' : 'grey lighten-2'"
        class="mt-2"
        flat
        />
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State } from "vuex-class";

@Component
export default class PostPreviewLoading extends Vue {
  @State(state => state.dark)
  dark!: Boolean;
}
</script>
