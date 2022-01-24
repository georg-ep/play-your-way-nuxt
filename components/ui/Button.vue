<template>
  <div>
    <div class="wrapper">
      <div class="content">
        <button :class="{ 'full-width': fullWidth }" @click="$emit('click')">
          {{ text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultButton",
  props: {
    text: {
      type: String,
      reqired: true,
      default: "",
    },
    fullWidth: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/button";
</style>
