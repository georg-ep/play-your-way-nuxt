<template>
  <div class="search-field">
    <div>
      <Textfield
        class="search-field"
        :text="displayItem(selected)"
        :label="label"
        :is-error="isError"
        :placeholder="placeholder"
        :error-text="errorText"
        @input="searchUsers"
        @focused="focus = true"
        @blurred="focus = false"
      />
      <div
        v-if="query && focus"
        :class="query && focus ? 'show-results' : 'hide-results'"
        class="search-results"
      >
        <div v-if="items">
          <div
            v-for="(item, index) in items.slice(0, 3)"
            :key="`item_${index}`"
            class="search-results_item"
            @click="selectItem(item)"
          >
            {{ displayItem(item) }}
          </div>
          <div v-if="remainingItems > 0" class="search-results_item">
            and {{ remainingItems }} more ...
          </div>
          <div v-if="items.length == 0" class="search-results_item">
            No results found
          </div>
        </div>
        <div v-else-if="!items && query">Searching</div>
      </div>
    </div>
  </div>
</template>

<script>
import Textfield from "~/components/ui/Textfield.vue";
export default {
  name: "SearchField",
  components: {
    Textfield,
  },
  props: {
    label: {
      type: String,
      required: false,
      default: "",
    },
    errorText: {
      type: String,
      required: false,
      default: "",
    },
    isError: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      required: true,
      default: "users",
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    selected: {
      type: [String, Object, null],
      required: false,
      default: "",
    },
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      query: "",
      focus: false,
    };
  },
  computed: {
    remainingItems() {
      return this.items.length - 3;
    },
    displayItem() {
      return (item) => {
        const config = {
          users: item ? item.email : "",
          players: item ? item.name : "",
        };
        return config[this.type];
      };
    },
  },
  methods: {
    searchUsers(value) {
      this.query = value;
      this.$emit("on-input", this.query);
    },
    selectItem(item) {
      this.query = "";
      this.$emit("select", item);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/search-field";
</style>
