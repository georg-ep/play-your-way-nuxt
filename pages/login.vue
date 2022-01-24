<template>
  <div class="content">
    <div class="content_title">Login</div>
    <Textfield
      v-model="email"
      :placeholder="'Email'"
      :is-error="errors.email"
      :error-text="errors.messages.email"
      class="tf"
      :label="'Email'"
    />
    <Textfield
      v-model="password"
      :is-error="errors.password"
      :error-text="errors.messages.password"
      :placeholder="'Password'"
      class="tf"
      :label="'Password'"
    />
    <div class="mid-section">
      <div class="no-account">
        Dont have an account?
        <nuxt-link to="/register"><span>Register here</span></nuxt-link>
      </div>
      <div class="no-account">
        Forgot your password?
        <nuxt-link to="/forgot-password"><span>Click here</span></nuxt-link>
      </div>
    </div>
    <Button
      class="button"
      :text="'Login'"
      :type="'hidden'"
      :full-width="true"
      @click="login"
    />
  </div>
</template>

<script>
import Textfield from "~/components/ui/Textfield.vue";
import Button from "~/components/ui/Button.vue";
export default {
  name: "LoginPage",
  components: {
    Textfield,
    Button,
  },
  layout: "authentication",
  data() {
    return {
      errors: {
        email: false,
        password: false,
        messages: {
          email: "",
          password: "",
        },
      },
      email: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    validate() {
      this.errors.email = false;
      this.errors.messages.email = "";
      if (!this.email) {
        this.errors.email = true;
        this.errors.messages.email = "Email field is required";
      }

      this.errors.password = false;
      this.errors.messages.password = "";
      if (!this.password) {
        this.errors.password = true;
        this.errors.messages.password = "Password field is required";
      }

      return this.email && this.password;
    },
    async login() {
      if (!this.validate()) return;
      try {
        const data = {
          email: this.email,
          password: this.password,
        };
        await this.$auth.loginWith("local", {
          data,
        });
        await this.$store.commit("setSnackbar", {
          show: true,
          text: "Successfully logged in",
          type: "success",
        });
        await this.$router.push("/");
      } catch (e) {
        this.$store.commit("setSnackbar", {
          show: true,
          text: e.response.data.detail,
          type: "error",
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "~/assets/scss/pages/authentication";
</style>
