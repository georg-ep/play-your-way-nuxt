<template>
  <div class="content">
    <div class="content_title">Register</div>
    <Textfield
      v-model="email"
      class="tf"
      :placeholder="'Email'"
      :label="'Email'"
    />
    <Textfield
      v-model="password"
      :type="'password'"
      :placeholder="'Password'"
      class="tf"
      :label="'Password'"
    />
    <Textfield
      v-model="repeatPassword"
      class="tf"
      :type="'password'"
      :placeholder="'Repeat password'"
      :label="'Repeat Password'"
    />
    <div class="no-account">
      Already have an account?
      <nuxt-link to="/login"><span>Login here</span></nuxt-link>
    </div>
    <Button
      :full-width="true"
      class="button"
      :text="'Register'"
      @click="register"
    />
  </div>
</template>

<script>
import Textfield from "~/components/ui/Textfield.vue";
import Button from "~/components/ui/Button.vue";
export default {
  name: "LoginPage",
  components: {
    Button,
    Textfield,
  },
  layout: "authentication",
  data() {
    return {
      email: "",
      password: "",
      repeatPassword: "",
    };
  },
  auth: false,
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        return false;
      }
      try {
        const data = {
          email: this.email,
          password: this.password,
        };
        await this.$store.dispatch("users/register", data);
        await this.$auth.loginWith("local", { data });
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
