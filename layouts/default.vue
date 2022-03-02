<template>
  <div id="app" class="preload">
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
  data() {
    return {
      socket: null,
    };
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
  mounted() {
    const id = this.$auth.user.id;
    this.socket = new WebSocket(
      "ws://" + "0.0.0.0:8080" + "/ws/chat/" + id + "/"
    );
    console.log(this.socket);
    console.log("Connected to websocket");
    this.socket.onmessage = (e) => {
      console.log(e);
      const data = JSON.parse(e.data);
      this.$store.commit("setSnackbar", {
        type: "bet-received",
        text: "£" + data.amount + " bet received from :: " + data.from + "!",
        show: true,
      });
    };
    this.socket.onclose = (e) => {
      console.log("Chat session closed");
    };
  },
  methods: {
    send() {
      console.log("sending");
      this.socket.send(
        JSON.stringify({
          message: "test",
        })
      );
    },
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
