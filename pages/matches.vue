<template>
  <div v-if="mData" class="content">
    <BetModal
      v-if="fixture"
      :users="users"
      :fixture="fixture"
      :show-modal="modal"
      @hide-modal="modal = false"
      @search-users="searchUsers"
    />
    <div class="page-headline">Matches</div>
    <div class="matches">
      <div v-if="isTableView" class="list">
        <MatchTile
          v-for="match in matches"
          :key="`match-${match}`"
          class="tile"
          :match="match"
        />
      </div>
      <Table v-if="mData.rows" :data="mData" @bet="quickBet" />
    </div>
  </div>
</template>

<script type="module">
import MatchTile from "~/components/ui/MatchTile.vue";
import Table from "~/components/ui/Table.vue";
import dateTimeMixin from "~/mixins/dateTimeMixin.js";
import BetModal from "~/components/ui/modals/BetModal.vue";
import { objectToQuery } from "~/utils/routing.js";
export default {
  components: {
    MatchTile,
    Table,
    BetModal,
  },
  mixins: [dateTimeMixin],
  async asyncData({ store }) {
    const matches = (await store.dispatch("matches/upcoming")).results;
    const mData = {
      headers: [
        {
          title: "Match",
        },
        {},
      ],
      rows: [],
      data: "",
    };
    let current = "";
    matches.forEach((match) => {
      if (current !== match.date) {
        current = match.date;
        mData.rows.push({
          col0: { header: match.date },
          type: "date",
        });
      }
      mData.rows.push({
        col0: { header: match.homeTeam.name + " :-: " + match.awayTeam.name },
        data: match.match_id,
        actions: ["bet"],
      });
    });
    return { mData };
  },
  data() {
    return {
      currentGameweek: 0,
      isTableView: false,
      filters: { search: "" },
      users: null,
      fixture: null,
      timeout: false,
      modal: false,
      currentDate: null,
    };
  },
  computed: {
    filtered() {
      return this.matches;
    },
    user() {
      return this.$auth && this.$auth.user ? this.$auth.user.email : "";
    },
  },
  watch: {
    async "filters.search"(val) {
      const filters = objectToQuery(this.filters);
      this.matches = (
        await this.$store.dispatch("matches/matches", { filters })
      ).results;
    },
  },
  mounted() {
    this.currentGameweek = this.gameweek;
  },
  methods: {
    searchUsers(query) {
      if (!this.timeout) {
        this.users = null;
        if (!query) return;
        this.timeout = true;
        setTimeout(async () => {
          try {
            this.users = (
              await this.$store.dispatch("users/list", query)
            ).results;
            console.log(this.users);
          } catch (e) {
            console.log(e);
          }
          this.timeout = false;
        }, 1000);
      }
    },
    async fetchData(matchId) {
      this.fixture = await this.$store.dispatch("matches/detail", matchId);
    },
    quickBet(matchId) {
      console.log(matchId);
      this.fetchData(matchId);
      this.modal = true;
    },
    toggleTableView() {
      this.isTableView = !this.isTableView;
    },
    async prev() {
      this.currentGameweek--;
      this.matches = (
        await this.$store.dispatch("matches/matches", {
          gameweek: this.currentGameweek,
        })
      ).results;
    },
    async next() {
      this.currentGameweek++;
      this.matches = (
        await this.$store.dispatch("matches/matches", {
          gameweek: this.currentGameweek,
        })
      ).results;
    },
  },
};
</script>

<style scoped lang="scss">
@import "~/assets/scss/pages/matches";
</style>
