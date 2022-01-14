<template>
  <div class="gradient-border">
    <div class="confirmed-bet-tile">
      <div class="border-container match">
        <div class="date">
          {{ bet.match.date }}
        </div>
        <div>
          {{ bet.match.awayTeam.name }} vs
          {{ bet.match.homeTeam.name }}
        </div>
      </div>
      <div class="border-container opponent">User {{ bet.opponent.email }}</div>
      <div>Winner {{ bet.winner }}</div>
      <div>is draw {{ bet.is_draw }}</div>
      To score
      <div v-for="(scorer, index) in bet.scorers" :key="`scorer_${index}`">
        {{ scorer.player.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmedBetTile",
  props: {
    bet: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/tiles/confirmed-bet-tile";
</style>
