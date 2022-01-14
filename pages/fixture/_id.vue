<template>
  <div>
    <BetModal
      :users="users"
      :players="players"
      :fixture="fixture"
      :show-modal="modal"
      @hide-modal="modal = false"
      @search-users="searchUsers"
    />
    <div v-if="fixture" class="content">
      {{ fixture.homeTeam.name }} vs {{ fixture.awayTeam.name }}
      <button @click="modal = true">Bet</button>
      <div
        v-if="team1 && team2"
        style="display: flex; width: 100%; justify-content: space-evenly"
      >
        <div>
          <div v-for="(player, index) in team1.players" :key="index">
            {{ player.name }}
          </div>
        </div>
        <div>
          <div v-for="(player, index) in team2.players" :key="index">
            {{ player.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BetModal from "~/components/ui/modals/BetModal.vue";
export default {
  name: "FixtureDetail",
  components: {
    BetModal,
  },
  data() {
    return {
      fixture: null,
      modal: false,
      users: null,
      timeout: false,
      betAmount: 0,
      team1: null,
      team2: null,
      items: ["Win", "Draw", "Lose"],
      selectedUser: null,
      players: null,
      playersToScore: [],
      searchedPlayers: null,
      selectedPlayer: null,
    };
  },
  computed: {},
  async mounted() {
    this.fixture = await this.$store.dispatch(
      "matches/detail",
      this.$route.params.id
    );
    this.team1 = await this.$store.dispatch(
      "teams/detail",
      this.fixture.homeTeam.team_id
    );
    this.team2 = await this.$store.dispatch(
      "teams/detail",
      this.fixture.awayTeam.team_id
    );
    this.players = this.team1.players.concat(this.team2.players);
  },
  methods: {
    async handleBet(opponent) {
      try {
        const payload = {
          user1: this.$auth.user.id,
          user2: opponent.id,
          amount: this.betAmount,
          match: this.$route.params.id,
        };
        await this.$store.dispatch("bets/create", payload);
        this.modal = false;
        alert("success");
      } catch (e) {
        console.log(e);
      }
    },
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
          } catch (e) {
            console.log(e);
          }
          this.timeout = false;
        }, 1000);
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
