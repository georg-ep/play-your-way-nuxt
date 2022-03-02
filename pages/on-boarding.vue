<template>
  <div class="content">
    <div class="content_title">Your details</div>

    <Textfield
      :name.sync="fields.first_name"
      :text="fields.first_name"
      :error-text="errors.first_name"
      :type="'text'"
      :placeholder="'First name'"
      class="tf mb-24"
      @keyup="validate('first_name')"
    />
    <Textfield
      :name.sync="fields.last_name"
      :text="fields.last_name"
      :type="'text'"
      :placeholder="'Last name'"
      class="tf mb-24"
    />
    <Button
      :text="'Complete registration'"
      class="button"
      :full-width="true"
      @click="submit"
    />
  </div>
</template>

<script>
import Textfield from "~/components/ui/Textfield.vue";
import Button from "~/components/ui/Button.vue";
import { formValidation } from "~/utils/validations.js";

export default {
  components: {
    Textfield,
    Button,
  },
  layout: "authentication",
  data() {
    return {
      errors: {
        first_name: "",
      },
      fields: {
        first_name: "",
        last_name: "",
      },
    };
  },
  methods: {
    validate(key = null) {
      this.errors.hasError = false;
      if (key) {
        const field = {};
        field[key] = this.fields[key];
        this.errors[key] = formValidation(field)[key];
        return;
      }
      this.errors = formValidation(this.fields);
      console.log(this.errors);
      return !this.errors.hasError;
    },
    submit() {
      if (!this.validate()) return;
      try {
        this.fields.is_onboarded = true;
        this.$store.dispatch("users/update", this.fields);
        this.$store.commit("setSnackbar", {
          show: true,
          text: "Successfully completed registration",
          type: "success",
        });
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/authentication";
</style>
