<template>
  <div>
    <div :class="size" class="container">
      <div v-if="label" class="label">{{ label }}</div>
      <div
        class="textfield-wrapper"
        :class="isError ? 'textfield-wrapper_error' : ''"
      >
        <div v-if="isCurrency">£</div>
        <input
          :type="type"
          :placeholder="placeholder"
          :class="[
            'textfield',
            filled ? 'textfield_filled' : 'textfield_default',
            size,
          ]"
          :value="text"
          @input="$emit('update:name', $event.target.value)"
          @focus="$emit('focused')"
          @blur="$emit('blurred')"
          @keyup.enter="$emit('keyup-enter')"
          @keyup="$emit('keyup')"
        />
        <div v-if="trailingIcon" class="trailing-icon">
          <img :src="icon" />
        </div>
      </div>
      <div class="error-text">
        <div :class="errorText ? 'show' : 'hide'">
          {{ errorText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Textfield",
  props: {
    label: {
      type: String,
      required: false,
      default: "",
    },
    filled: {
      type: Boolean,
      required: false,
      default: false,
    },
    errorText: {
      type: String,
      required: false,
      default: "",
    },
    trailingIcon: {
      type: String,
      required: false,
      default: "",
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    isCurrency: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },
    text: {
      type: String,
      required: false,
      default: "",
    },
    size: {
      type: String,
      default: "medium",
    },
  },
  computed: {
    icon() {
      const config = {
        search: require("~/assets/icons/search.svg"),
      };
      return config[this.trailingIcon];
    },
    isError() {
      return this.errorText;
    },
  },
};
</script>

<style scoped lang="scss">
@import "~assets/scss/components/ui/textfield";
</style>
