<template>
  <div v-if="matches && requests" class="content">
    <div class="page-headline">Matches</div>
    <div class="matches">
      <div style="margin-bottom: 24px" class="headline">
        <button @click="prev">Prev</button>
        Upcoming matches for gameweek {{ currentGameweek }}
        <button @click="next">Next</button>
      </div>
      <div class="list">
        <MatchTile
          v-for="match in matches"
          :key="`match-${match}`"
          class="tile"
          :match="match"
        />
      </div>
    </div>
  </div>
</template>

<script type="module">
import MatchTile from "~/components/ui/MatchTile.vue";
export default {
  components: {
    MatchTile,
  },
  async asyncData({ store }) {
    const gameweek = (await store.dispatch("matches/fetchGameweek")).gameweek;
    const requests = (await store.dispatch("bets/pending")).results;
    const matches = (await store.dispatch("matches/matches", gameweek)).results;
    return { requests, matches, gameweek };
  },
  data() {
    return {
      currentGameweek: 0,
    };
  },
  computed: {
    user() {
      return this.$auth && this.$auth.user ? this.$auth.user.email : "";
    },
  },
  mounted() {
    this.currentGameweek = this.gameweek;
  },
  methods: {
    async prev() {
      this.currentGameweek--;
      this.matches = (
        await this.$store.dispatch("matches/matches", this.currentGameweek)
      ).results;
    },
    async next() {
      this.currentGameweek++;
      this.matches = (
        await this.$store.dispatch("matches/matches", this.currentGameweek)
      ).results;
    },
  },
};
</script>

<style scoped lang="scss">
@import "~/assets/scss/pages/matches";
</style>
