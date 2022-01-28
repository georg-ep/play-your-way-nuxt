<template>
  <div class="content">
    <div class="content_title">Login</div>
    <Textfield
      :name.sync="email"
      :placeholder="'Email'"
      :error-text="errors.email"
      class="tf"
      :class="{ tf_error: errors.email }"
      :label="'Email'"
    />
    <Textfield
      :name.sync="password"
      :error-text="errors.password"
      :placeholder="'Password'"
      :type="'password'"
      class="tf"
      :class="{ tf_error: errors.email }"
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
        email: "",
        password: "",
      },
      email: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    validate() {
      let error = false;
      ["email", "password"].forEach((item) => {
        this.$set(this.errors, item, "");
        console.log(this.errors);
        if (!this.errors[item]) {
          this.$set(this.errors, item, "Required");
          error = true;
        }
      });
      return !error;
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
