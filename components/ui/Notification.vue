<template>
  <div v-if="count > 0" class="noti_wrapper">
    <div class="noti_content">
      <div>
        {{ count }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: {
    count: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/frame";
</style>
