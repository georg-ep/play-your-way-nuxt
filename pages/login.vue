<template>
  <div class="content">
    <div class="content_title">Login</div>
    <Textfield
      :name.sync="fields.email"
      :text="fields.email"
      :placeholder="'Email'"
      :error-text="errors.email"
      class="tf mb-24"
      @keyup="validate('email')"
    />
    <Textfield
      :name.sync="fields.password"
      :text="fields.password"
      :error-text="errors.password"
      :placeholder="'Password'"
      :type="'password'"
      class="tf mb-24"
      @keyup-enter="login"
      @keyup="validate('password')"
    />
    <Button
      class="button mb-24"
      :text="'Login'"
      :type="'hidden'"
      :full-width="true"
      @click="login"
    />
    <div class="mid-section">
      <Divider :text="'Or'" class="mb-24" />
      <div class="no-account">
        <nuxt-link to="/register"><span>Register here</span></nuxt-link>
      </div>
      <div class="no-account">
        <nuxt-link to="/forgot-password"
          ><span>Forgot password</span></nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import Textfield from "~/components/ui/Textfield.vue";
import Button from "~/components/ui/Button.vue";
import { formValidation } from "~/utils/validations.js";
import Divider from "~/components/ui/Divider.vue";
export default {
  name: "LoginPage",
  components: {
    Textfield,
    Button,
    Divider,
  },
  layout: "authentication",
  data() {
    return {
      errors: {
        email: "",
        password: "",
      },
      fields: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },
  methods: {
    validate(key = null) {
      if (key) {
        const field = {};
        field[key] = this.fields[key];
        this.errors[key] = formValidation(field)[key];
        return;
      }
      this.errors = formValidation(this.fields);
      return !this.errors.hasError;
    },
    async login() {
      if (!this.validate()) return;
      try {
        const data = {
          email: this.fields.email,
          password: this.fields.password,
        };
        await this.$auth.loginWith("local", {
          data,
        });
        if (!this.$auth.user.is_onboarded) {
          return this.$router.push("/on-boarding/");
        }
        await this.$store.commit("setSnackbar", {
          show: true,
          text: "Successfully logged in",
          type: "success",
        });
        await this.$router.push("/");
      } catch (e) {
        this.$store.commit("setSnackbar", {
          show: true,
          text: e.response ? e.response.data.detail : e,
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
