<template>
  <div>
    <div class="wrapper">
      <Nuxt />
    </div>
    <Snackbar v-if="showSnackbar" :data="snackbarData" />
  </div>
</template>

<script>
import Snackbar from "~/components/ui/snackbar/Snackbar.vue";
export default {
  name: "AuthenticationLayout",
  components: {
    Snackbar,
  },
  computed: {
    showSnackbar() {
      return this.$store.state.snackbar.show;
    },
    snackbarData() {
      return this.$store.state.snackbar;
    },
    isLoading() {
      return this.$store.state.loading;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/layouts/authentication";
</style>
