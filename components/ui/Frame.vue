<template>
  <div>
    <div class="nav-bar">
      <Button
        class="button_trailing"
        :text="trailingButtonText"
        @click="handleClick"
      />
      <Button
        v-if="userAuth"
        class="button_trailing"
        :text="'Logout'"
        @click="logout"
      />
    </div>
    <div class="frame">
      <div class="sidebar">
        <div
          v-for="(item, index) in items"
          :key="`item_${index}`"
          class="sidebar_item"
          :class="tileSelected(index) ? 'selected-item' : ''"
          @click="toRoute(index)"
        >
          {{ item }}
        </div>
      </div>
      <div class="content-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/ui/Button.vue";
export default {
  name: "Sidebar",
  components: {
    Button,
  },
  data() {
    return {
      items: ["🏠 Home", "💰 My bets", "⚽️ Matches", "👥 Friends"],
    };
  },
  computed: {
    tileSelected() {
      return (index) => {
        const path = this.$route.path;
        const config = {
          0: path === "/",
          1: path.includes("my-bets"),
          2: path.includes("matches") || path.includes("fixture"),
          3: path.includes("friends"),
        };
        return config[index];
      };
    },
    userAuth() {
      return this.$auth.$state.loggedIn;
    },
    trailingButtonText() {
      return this.userAuth ? "My account" : "Login";
    },
  },
  methods: {
    toRoute(index) {
      const config = {
        0: "/",
        1: "/my-bets",
        2: "/matches",
        3: "/friends",
      };
      this.$router.push(config[index]);
    },
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
    },
    handleClick() {
      if (this.userAuth) {
        // TODO nav to user profile
        return false;
      }
      return this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/frame";
</style>
