<template>
  <div class="d-flex">
    <div class="divider" />
    <div v-if="text" class="text">{{ text }}</div>
    <div class="divider" />
  </div>
</template>

<script>
export default {
  name: "Divider",
  props: {
    text: {
      type: String,
      required: false,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/divider";
</style>
