<template>
  <div class="wrapper">
    <div :class="[hide ? 'hidden' : 'show', data.type]" class="snackbar">
      <img :src="prefixIcon" />
      {{ data.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Snackbar",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hide: false,
    };
  },
  computed: {
    prefixIcon() {
      const conifg = {
        success: require("~/assets/icons/check-cyan.svg"),
        error: require("~/assets/icons/close-circle-black.svg"),
      };
      const imgRef = conifg[this.data.type];
      return imgRef || "";
    },
  },
  mounted() {
    setTimeout(() => {
      this.hide = true;
    }, 4000);
    setTimeout(() => {
      this.$store.commit("setSnackbar", { show: false });
    }, 5000);
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/snackbar";
</style>
