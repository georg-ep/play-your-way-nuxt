<template>
  <tr :class="isCollapsed ? 'slide-down' : 'slide-up'" class="row">
    <!-- <img
        class="chevron"
        :class="{ rotated: !isCollapsed }"
        src="~/assets/icons/chevron-down.svg"
      /> -->
    <td class="no-wrap">
      <div class="ph-0">
        <Button v-if="canBet" :text="'Quick Bet'" @click="quickBet" />
      </div>
      <div class="date ph-0" colspan="3">
        {{ matchDate(match.date) }}
      </div>
    </td>
    <td colspan="2">
      <table class="no-wrap table-view">
        <th>
          <div class="team-name">
            {{ match.homeTeam.name }}
          </div>
          <img class="team-img" :src="match.homeTeam.crest" />
        </th>
        <th>vs</th>
        <th>
          <img class="team-img" :src="match.awayTeam.crest" />
          <div class="team-name">
            {{ match.awayTeam.name }}
          </div>
        </th>
      </table>
    </td>
    <td>
      <div>{{ match.home_goals }} - {{ match.away_goals }}</div>
    </td>
    <td>
      <div class="bubble">{{ matchStatus(match) }}</div>
    </td>
  </tr>
</template>

<script>
import dateTimeMixin from "~/mixins/dateTimeMixin.js";
import Button from "~/components/ui/Button.vue";

export default {
  name: "MatchTableRow",
  components: {
    Button,
  },
  mixins: [dateTimeMixin],
  props: {
    match: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isCollapsed: true,
    };
  },
  computed: {
    matchStatus() {
      return (match) => {
        const isPostponed = match.status === "POSTPONED";
        return isPostponed ? "PP" : match.winner ?? "TBD";
      };
    },
    matchDate() {
      return (date) => {
        return this.formattedDate(date) + " at " + this.formattedTime(date);
      };
    },
    formattedTime() {
      return (date) => {
        return this.timeFormatter(date);
      };
    },
    formattedDate() {
      return (date) => {
        return this.dateFormatter(date);
      };
    },
    canBet() {
      return this.match.status === "SCHEDULED";
    },
  },
  methods: {
    quickBet() {
      this.$emit("quick-bet", this.match);
    },
    toggleCollapsedRow() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>

<style scoped lang="scss">
@import "~/assets/scss/components/ui/match-table-row";
</style>
