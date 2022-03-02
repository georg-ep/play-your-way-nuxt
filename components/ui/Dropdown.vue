<template>
  <div
    :class="!visible ? 'show-menu' : 'hide-menu'"
    class="dropdown"
    :style="{ top: top, right: right, width: width }"
  >
    <div
      v-for="(item, idx) in items"
      :key="`item_${idx}`"
      class="item"
      @click="clickItem(item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
    items: {
      type: Array,
      required: true,
    },
    top: {
      type: String,
      required: false,
      default: "60px",
    },
    right: {
      type: String,
      required: false,
      default: "0px",
    },
    width: {
      type: String,
      required: false,
      default: "100px",
    },
  },
  computed: {
    hasIcon() {
      return (item) => {
        return typeof item === "object" && item.icon;
      };
    },
  },
  methods: {
    clickItem(item) {
      this.$emit("click-item", item);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/dropdown";
</style>
