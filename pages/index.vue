<template>
  <div class="dashboard-container">
    <div class="sub-container">
      <div class="page-headline" style="font-weight: bold">Dashboard</div>
      <div class="content-container content-container_lighter">
        <div class="headline_large">Hello {{ $auth.user.first_name }} 👋</div>
      </div>
    </div>
    <div class="sub-container">
      <div class="page-headline ml-16" style="font-weight: bold">
        Upcoming matches
      </div>
      <div class="match-grid">
        <UpcomingMatch
          v-for="(match, idx) in matches.slice(0, 4)"
          :key="`match_${idx}`"
          :match="match"
        />
      </div>
    </div>
  </div>
</template>

<script type="module">
import UpcomingMatch from "~/components/ui/UpcomingMatch.vue";
import { objectToQuery } from "~/utils/routing.js";
export default {
  components: {
    UpcomingMatch,
  },
  async asyncData({ store }) {
    const filters = objectToQuery({ status: "SCHEDULED" });
    const matches = (await store.dispatch("matches/matches", { filters }))
      .results;
    return { matches };
  },
};
</script>

<style scoped lang="scss">
@import "~/assets/scss/pages/dashboard";
</style>
