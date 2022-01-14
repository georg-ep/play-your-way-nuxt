<template>
  <div id="app">
    <Frame>
      <Nuxt />
    </Frame>
    <Snackbar v-if="showSnackbar" :data="snackbarData" />
  </div>
</template>

<script>
import Frame from "~/components/ui/Frame.vue";
import Snackbar from "~/components/ui/snackbar/Snackbar.vue";
export default {
  name: "DefaultTemplate",
  components: {
    Frame,
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
    isLoggedIn() {
      return this.$auth.$state.loggedIn;
    },
    buttonText() {
      return this.isLoggedIn ? "Logout" : "Login";
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/layouts/default";
</style>
