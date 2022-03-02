<template>
  <div class="profile">
    <div class="headline_large">My Profile</div>
    <div
      v-if="fields"
      class="content-container content-container_lighter mt-24"
    >
      <Textfield
        :filled="true"
        :name.sync="fields.first_name"
        :text="fields.first_name"
        :label="'First name'"
        class="mb-24"
        :placeholder="'First name'"
      />
      <Textfield
        :filled="true"
        :name.sync="fields.last_name"
        :text="fields.last_name"
        :label="'Last name'"
        class="mb-24"
        :placeholder="'Last name'"
      />
      <Textfield
        :filled="true"
        :name.sync="fields.email"
        :text="fields.email"
        :label="'Email'"
        class="mb-24"
        :placeholder="'Email'"
      />
      <Searchfield
        :name.sync="teamQuery"
        :filled="true"
        :label="'Live notifications'"
        :items="filteredTeams"
        class="mb-24"
        :placeholder="'Search for a team'"
      />
      <Button :text="'Update profile'" @click="submit" />
    </div>
  </div>
</template>

<script>
import Textfield from "~/components/ui/Textfield.vue";
import Button from "~/components/ui/Button.vue";
import Searchfield from "~/components/ui/SearchField.vue";
export default {
  name: "Profile",
  components: {
    Textfield,
    Searchfield,
    Button,
  },
  async asyncData({ store }) {
    const user = await store.dispatch("users/detail");
    const teams = (await store.dispatch("teams/list")).results;
    return { user, teams };
  },
  data() {
    return {
      fields: null,
      teamQuery: "",
      filteredTeams: null,
    };
  },
  watch: {
    teamQuery(value) {
      this.filteredTeams = this.teams.filter((team) =>
        team.name.toLowerCase().includes(value.toLowerCase())
      );
    },
  },
  mounted() {
    this.filteredTeams = this.teams;
    this.fields = this.user;
  },
  methods: {
    async submit() {
      await this.$store.dispatch("users/update", this.fields);
      await this.$auth.fetchUser();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/dashboard";
</style>
