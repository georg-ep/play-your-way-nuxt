<template>
  <div>
    <div :class="size" class="container">
      <div v-if="label" class="label">{{ label }}</div>
      <div class="textfield-wrapper">
        <div v-if="isCurrency">£</div>
        <input
          :type="type"
          :placeholder="placeholder"
          class="textfield"
          :class="[size, isError ? 'textfield_error' : '']"
          @input="$emit('update:name', $event.target.value)"
          @focus="$emit('focused')"
          @blur="$emit('blurred')"
        />
      </div>
      <div v-if="errorText" class="error-text">{{ errorText }}</div>
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
    errorText: {
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
    isError() {
      return this.errorText;
    },
  },
};
</script>

<style scoped lang="scss">
@import "~assets/scss/components/ui/textfield";
</style>
