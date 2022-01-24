<template>
  <div v-if="matches && requests" class="content">
    <div class="page-headline">Matches</div>
    <div class="matches">
      <div class="headline d-flex mb-24">
        <Button :text="'Previous'" @click="prev" />
        <div class="mh-16">
          Upcoming matches for gameweek {{ currentGameweek }}
        </div>

        <Button :text="'Next'" @click="next" />
        <Button class="mh-16" :text="'Switch view'" @click="toggleTableView" />
      </div>
      <div v-if="isTableView" class="list">
        <MatchTile
          v-for="match in matches"
          :key="`match-${match}`"
          class="tile"
          :match="match"
        />
      </div>
      <table v-else class="table-view">
        <tr>
          <th></th>
          <th>Date</th>
          <th :colspan="2">Match</th>
          <th>Score</th>
          <th>Winner</th>
        </tr>
        <MatchTableRow
          v-for="(match, idx) in matches"
          :key="`match_${idx}`"
          :match="match"
          :loading="loading"
        />
      </table>
    </div>
  </div>
</template>

<script type="module">
import MatchTile from "~/components/ui/MatchTile.vue";
import Button from "~/components/ui/Button.vue";
import dateTimeMixin from "~/mixins/dateTimeMixin.js";
import MatchTableRow from "~/components/ui/MatchTableRow.vue";
export default {
  components: {
    MatchTile,
    Button,
    MatchTableRow,
  },
  mixins: [dateTimeMixin],
  async asyncData({ store }) {
    const gameweek = (await store.dispatch("matches/fetchGameweek")).gameweek;
    const requests = (await store.dispatch("bets/pending")).results;
    const matches = (await store.dispatch("matches/matches", gameweek)).results;
    return { requests, matches, gameweek };
  },
  data() {
    return {
      currentGameweek: 0,
      isTableView: false,
      loading: false,
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
    toggleTableView() {
      this.isTableView = !this.isTableView;
    },
    async prev() {
      this.loading = true;
      this.currentGameweek--;
      this.matches = (
        await this.$store.dispatch("matches/matches", this.currentGameweek)
      ).results;
      this.loading = false;
    },
    async next() {
      this.loading = true;
      this.currentGameweek++;
      this.matches = (
        await this.$store.dispatch("matches/matches", this.currentGameweek)
      ).results;
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import "~/assets/scss/pages/matches";
</style>
