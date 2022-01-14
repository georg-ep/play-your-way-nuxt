<template>
  <div>
    <div class="wrapper">
      <div class="gradient-border">
        <div class="content">
          <button @click="$emit('click')">{{ text }}</button>
        </div>
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
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/button";
</style>
