import Vue from "vue";
import snackbar from "@/components/Snackbar.vue";

const data = {
  snackbarVisible: false,
  snackbarMessage: "",
  snackbarColor: "info"
};

const methods = {
  showSnackbar(message, color) {
    data.snackbarVisible = false;
    data.snackbarMessage = message;
    data.snackbarColor = color;
    data.snackbarVisible = true;
  },
  setSnackbar(value) {
    data.snackbarVisible = value;
  },
  getSnackbar() {
    return data.snackbarVisible;
  }
};

Vue.mixin({
  data: () => data,
  methods
});

export default methods;
