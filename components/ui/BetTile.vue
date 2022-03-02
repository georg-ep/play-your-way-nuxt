<template>
  <!-- amount, user_who_has_best, match date,  -->
  <div v-if="!isHidden" :class="isAccepted ? 'hidden' : ''" class="bet-tile">
    <div class="bet-tile_from-user">{{ request.opponent.email }}</div>
    <div class="bet-tile_amount">${{ request.amount }}</div>
    <div class="bet-tile_game">
      {{ request.match.homeTeam.name }} vs {{ request.match.awayTeam.name }}
    </div>
    <div class="bet-tile_date">{{ request.match.date }}</div>
    <div class="bet-tile.buttons divider">
      <button class="button button_accept" @click="acceptBet">Accept</button
      ><button class="button button_decline">Decline</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BetTile",
  props: {
    request: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isAccepted: false,
      isHidden: false,
    };
  },
  methods: {
    async acceptBet() {
      try {
        const betId = this.request.id;
        await this.$store.dispatch("bets/accept", betId);
        this.isAccepted = true;
        setTimeout(() => {
          this.isHidden = true;
        }, 1000);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "~/assets/scss/components/ui/bet-tile";
</style>
