<template>
  <div class="content">
    <div class="content_title">Register</div>
    <Textfield
      :name.sync="fields.email"
      :text="fields.email"
      :error-text="errors.email"
      class="tf mb-24"
      :placeholder="'Email'"
      @keyup="validate('email')"
    />
    <Textfield
      :name.sync="fields.password"
      :text="fields.password"
      :error-text="errors.password"
      :type="'password'"
      :placeholder="'Password'"
      class="tf mb-24"
      @keyup="validate('password')"
    />
    <Textfield
      :name.sync="fields.repeatPassword"
      :text="fields.repeatPassword"
      :error-text="errors.repeatPassword"
      class="tf mb-24"
      :type="'password'"
      :placeholder="'Repeat password'"
    />
    <Button
      :full-width="true"
      class="button mb-24"
      :text="'Register'"
      @click="register"
    />
    <div class="mid-section">
      <Divider :text="'Or'" class="mb-24" />
      <div class="no-account">
        <nuxt-link to="/login"><span>Login here</span></nuxt-link>
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
import Divider from "~/components/ui/Divider.vue";
import { formValidation } from "~/utils/validations.js";

export default {
  name: "LoginPage",
  components: {
    Button,
    Textfield,
    Divider,
  },
  layout: "authentication",
  data() {
    return {
      errors: {
        email: "",
        password: "",
        repeatPassword: "",
      },
      fields: {
        email: "",
        password: "",
        repeatPassword: "",
      },
    };
  },
  auth: false,
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
    async register() {
      if (!this.validate()) return;
      if (this.password !== this.confirmPassword) {
        return false;
      }
      try {
        const data = {
          email: this.fields.email,
          password: this.fields.password,
        };
        await this.$store.dispatch("users/register", data);
        await this.$auth.loginWith("local", { data });
        this.$router.push("/on-boarding/");
      } catch (e) {
        if (e.response.data.detail === "Already registered") {
          this.$set(this.errors, "email", "This user is already registered");
        }
        // this.$store.commit("setSnackbar", {
        //   show: true,
        //   text: e.response ? e.response.data.detail : "Error encountered",
        //   type: "error",
        // });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "~/assets/scss/pages/authentication";
</style>
