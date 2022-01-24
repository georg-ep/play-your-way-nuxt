<template>
  <tr
    v-if="!loading"
    :class="isCollapsed ? 'slide-down' : 'slide-up'"
    class="row"
    @click="toggleCollapsedRow"
  >
    <td>
      <img
        class="chevron"
        :class="{ rotated: !isCollapsed }"
        src="~/assets/icons/chevron-down.svg"
      />
    </td>
    <td class="no-wrap">
      {{ matchDate(match.date) }}

      <div :class="isCollapsed ? 'hide' : 'show'" class="extra">Status</div>
    </td>
    <td :colspan="2">
      <div class="no-wrap d-flex d-flex_center">
        <img class="team-img" :src="match.homeTeam.crest" />
        <div class="team-name">
          {{ match.homeTeam.name }}
        </div>
        <div class="mh-16">vs</div>
        <div class="team-name">
          {{ match.awayTeam.name }}
        </div>
        <img class="team-img" :src="match.awayTeam.crest" />
      </div>
      <div :class="isCollapsed ? 'hide' : 'show'" class="extra">Scorers</div>
    </td>
    <td>
      <div>{{ match.home_goals }} - {{ match.away_goals }}</div>
    </td>
    <td>
      <div class="no-wrap">{{ matchStatus(match) }}</div>
    </td>
  </tr>
  <tr v-else>
    <td v-for="i in 4" :key="i"><div class="loading" /></td>
  </tr>
</template>

<script>
import dateTimeMixin from "~/mixins/dateTimeMixin.js";
export default {
  name: "MatchTableRow",
  mixins: [dateTimeMixin],

  props: {
    match: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
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
        return isPostponed ? "PP" : match.winner ? match.winner : "TBD";
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
  },
  methods: {
    toggleCollapsedRow() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>

<style scoped lang="scss">
@import "~/assets/scss/components/ui/match-table-row";
</style>
