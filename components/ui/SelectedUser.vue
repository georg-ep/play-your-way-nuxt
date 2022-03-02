<template>
  <div class="d-flex d-flex_space">
    <div class="d-flex">
      <div class="">Selected User</div>
      <div class="selected-user">
        {{ user.email }}
      </div>
    </div>
    <div class="change" @click="$emit('reset-selected')">Change</div>
  </div>
</template>

<script>
export default {
  name: "SelectedUser",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/selected-user";
</style>
