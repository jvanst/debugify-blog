<template>
  <div id="editor" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Quill from "quill";
import "@/assets/css/snow.css";

@Component
export default class Editor extends Vue {
  @Prop() value!: string;
  editor: any;

  mounted() {
    this.editor = new Quill("#editor", {
      theme: "snow"
    });
    this.editor.root.innerHTML = this.value;
    this.editor.on("text-change", () => this.update());
  }
  update() {
    this.$emit("input", {
      text: this.editor.getText(),
      html: this.editor.root.innerHTML
    });
  }
}
</script>

<style>
#editor {
  height: 375px;
}
</style>
