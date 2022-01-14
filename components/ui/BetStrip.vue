<template>
  <div class="bet-strip">
    <div class="mb-4 label">
      {{ label }}
    </div>
    <div class="bet-strip_choices">
      <div
        v-for="(item, index) in items"
        :key="`block_${index}`"
        class="bet-block"
        :class="{ selected: isSelected(index) }"
        @click="select(index)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BetStrip",
  props: {
    label: {
      type: String,
      required: false,
      default: "",
    },
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      selected: null,
    };
  },
  computed: {
    isSelected() {
      return (index) => {
        return index === this.selected;
      };
    },
  },
  methods: {
    select(index) {
      if (this.selected === index) {
        this.selected = null;
        return;
      }
      this.selected = index;
      this.$emit("prediction", this.items[index]);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/bet-strip";
</style>
