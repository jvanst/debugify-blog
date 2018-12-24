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
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"], // toggled buttons
          ["blockquote", "code-block"],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ direction: "rtl" }], // text direction

          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ["link", "image"],
          ["clean"] // remove formatting button
        ]
      }
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
  height: 550px;
}
</style>
