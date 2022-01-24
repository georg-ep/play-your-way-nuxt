<template>
  <div class="content">
    <div class="content_title">Forgotten Password</div>
    <Textfield v-model="email" class="tf" :label="'Email'" />
    <Button class="button" :text="'Recover Password'" @click="sendEmail" />
  </div>
</template>

<script>
import Textfield from "~/components/ui/Textfield.vue";
import Button from "~/components/ui/Button.vue";

export default {
  name: "ForgotPasswordPage",
  components: {
    Textfield,
    Button,
  },
  layout: "authentication",
  auth: false,
  data() {
    return {
      email: "",
    };
  },
  methods: {
    sendEmail() {
      try {
        // TODO handle lost password email
        this.$router.push("/login");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "~/assets/scss/pages/authentication";
</style>
