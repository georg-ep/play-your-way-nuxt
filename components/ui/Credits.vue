<template>
  <div class="credits">
    <div class="title">Credits</div>
    <div class="amount">${{ credits }}</div>
  </div>
</template>

<script>
export default {
  name: "Credits",
  data() {
    return {
      credits: 10,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/credits";
</style>
