<template>
  <div>
    <div class="nav-bar">
      <div>
        <img
          class="burger-menu"
          src="~/assets/icons/burger-menu-white.svg"
          @click="modal = !modal"
        />
      </div>
      <div class="actions">
        <img
          class="avatar"
          src="~/assets/images/default.jpg"
          alt=""
          @click="toggleMenu"
        />
        <Dropdown
          :visible="showMenu"
          :right="'25px'"
          :width="'300px'"
          :items="navItems"
          @click-item="itemClick"
        />
      </div>
    </div>
    <div class="frame">
      <div :class="modal ? 'show' : 'hide'" class="sidebar">
        <div
          v-for="(item, index) in items"
          :key="`item_${index}`"
          class="sidebar_item"
          :class="tileSelected(index) ? 'selected-item' : ''"
          @click="toRoute(index)"
        >
          <div class="heading">
            <Notification v-if="index === 1" :count="receivedBets" />
            {{ item.text }}
          </div>
          <div>
            {{ item.icon }}
          </div>
        </div>
      </div>
      <div class="content-body">
        <slot></slot>
      </div>
      <Credits />
    </div>
  </div>
</template>

<script>
import Dropdown from "~/components/ui/Dropdown.vue";
import Credits from "~/components/ui/Credits.vue";
import Notification from "~/components/ui/Notification.vue";
export default {
  name: "Sidebar",
  components: {
    Dropdown,
    Credits,
    Notification,
  },
  data() {
    return {
      showMenu: false,
      items: [
        { text: "Home", icon: "🏠" },
        { text: "My-bets", icon: "💰" },
        { text: "Matches", icon: "⚽️" },
      ],
      modal: false,
    };
  },
  computed: {
    navItems() {
      return [`Hello, ${this.$auth.user.first_name}`, "Profile", "Logout"];
    },
    tileSelected() {
      return (index) => {
        const path = this.$route.path;
        const config = {
          0: path === "/" || path.includes("profile"),
          1: path.includes("my-bets"),
          2: path.includes("matches") || path.includes("fixture"),
          3: path.includes("friends"),
        };
        return config[index];
      };
    },
    receivedBets() {
      return this.$auth.user.received_bets_amount;
    },
    userAuth() {
      return this.$auth.$state.loggedIn;
    },
    trailingButtonText() {
      return this.userAuth ? "My account" : "Login";
    },
  },
  methods: {
    async itemClick(item) {
      this.showMenu = false;
      if (item.toLowerCase() === "profile") {
        this.$router.push("/profile/");
      }
      if (item.toLowerCase() === "logout") {
        await this.$auth.logout();
      }
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    toRoute(index) {
      const config = {
        0: "/",
        1: "/my-bets",
        2: "/matches",
        3: "/friends",
      };
      this.modal = false;
      this.$router.push(config[index]);
    },
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
    },
    handleClick(item) {
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
