<template>
  <div class="content">
    <div class="content_title t-center m-0 p-0">We go live in</div>
    <div>{{ timer }}</div>
  </div>
</template>

<script>
export default {
  name: "Countdown",
  computed: {
    timer() {
      const release = new Date(2022, 10, 1);
      const date = new Date();
      return release - date;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/authentication";
</style>
