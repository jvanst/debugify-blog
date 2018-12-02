<template>
  <div><slot :response="response" :loading="loading"></slot></div>
</template>

<script>
export default {
  name: "FetchJson",
  props: ["url"],
  data() {
    return {
      response: null,
      loading: true
    };
  },
  created() {
    fetch(this.url)
      .then(response => response.json())
      .then(response => {
        setTimeout(() => {
          this.response = response;
          this.loading = false;
        }, 500);
      });
  }
};
</script>
