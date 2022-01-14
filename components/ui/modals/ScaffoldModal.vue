<template>
  <div :class="animateOut ? 'hide-bg' : 'show-bg'" class="modal">
    <div class="modal_bg" @click="$emit('close')" />
    <div
      :class="animateOut ? 'hide-content' : 'show-content'"
      class="modal__content"
    >
      <div class="header-wrapper mb-24">
        <div class="headline_large">{{ title }}</div>
        <div class="modal__close">
          <img
            src="~/assets/icons/remove-white.svg"
            class="modal__close__cross"
            @click="$emit('close')"
          />
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScaffoldModal",
  props: {
    size: {
      type: String,
      default: "large",
    },
    title: {
      type: String,
      required: false,
      default: "",
    },
    animateOut: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/modal";
</style>
