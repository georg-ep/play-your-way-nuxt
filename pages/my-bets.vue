<template>
  <div class="my-bets">
    <div class="page-headline">My bets</div>

    <div class="headline mb-24">Confirmed bets</div>
    <ConfirmedBetTile
      v-for="(bet, index) in bets.results"
      :key="`bet_${index}`"
      :bet="bet"
    />
  </div>
</template>

<script>
import ConfirmedBetTile from "~/components/ui/ConfirmedBetTile.vue";
export default {
  name: "MyBets",
  components: {
    ConfirmedBetTile,
  },
  async asyncData({ store }) {
    const bets = await store.dispatch("bets/mine");
    return { bets };
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/my-bets";
</style>
