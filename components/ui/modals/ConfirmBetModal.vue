<template>
  <Modal
    v-if="showModal"
    :title="'Confirm Bet'"
    :animate-out="animateOut"
    @close="$emit('hide-modal')"
  >
    <div>By agreeing to this bet with {{ data.opponent.email }}</div>
    <div>You think that someone will lose ........</div>
    <Button :text="'Confirm'" :full-width="true" @click="accept" />
  </Modal>
</template>

<script>
import Button from "~/components/ui/Button.vue";

import Modal from "~/components/ui/modals/ScaffoldModal.vue";
export default {
  name: "ConfirmBetModal",
  components: {
    Modal,
    Button,
  },
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async accept() {
      try {
        await this.$store.dispatch("bets/accept", this.data.id);
        this.$store.commit("setSnackbar", {
          type: "success",
          show: true,
          text: "Your bet has been confirmed!",
        });
        this.$emit("hide-modal");
        this.$emit("success");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/bet-modal";
</style>
