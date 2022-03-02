<template>
  <div class="match-tile">
    <div class="d-flex d-flex_space mb-24">
      <div class="league">Premier League</div>
      <div class="match-details">
        <div class="time">{{ time }}</div>
        <div class="date">{{ date }}</div>
      </div>
    </div>
    <div class="away-team mb-24">{{ match.awayTeam.name }}</div>
    <div class="home-team mb-24 ta-r">{{ match.homeTeam.name }}</div>
    <div class="actions d-flex d-flex_center">
      <div class="action action_yellow">Bet</div>
      <div class="action action_blue mh-16">League</div>
      <div class="action action_red">Details</div>
    </div>
  </div>
</template>

<script>
import dateTimeMixin from "~/mixins/dateTimeMixin.js";
export default {
  name: "UpcomingMatch",
  mixins: [dateTimeMixin],
  props: {
    match: {
      type: Object,
      required: true,
    },
  },
  computed: {
    time() {
      return this.timeFormatter(this.match.date);
    },
    date() {
      return this.dateFormatter(this.match.date);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/upcoming-match";
</style>
