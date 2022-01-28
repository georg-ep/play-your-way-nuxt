<template>
  <div>
    <div class="wrapper">
      <div>
        <Countdown class="mb-24" />
        <Nuxt />
      </div>
    </div>
    <Snackbar v-if="showSnackbar" :data="snackbarData" />
  </div>
</template>

<script>
import Snackbar from "~/components/ui/snackbar/Snackbar.vue";
import Countdown from "~/components/Countdown.vue";
export default {
  name: "AuthenticationLayout",
  components: {
    Snackbar,
    Countdown,
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
