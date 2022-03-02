<template>
  <Modal
    v-if="showModal"
    :title="'Create a bet'"
    :animate-out="animateOut"
    @close="hideModal"
  >
    <Textfield
      class="mb-24"
      :label="`Enter a bet amount`"
      :is-currency="true"
      :text="String(betAmount)"
      :type="'number'"
      :is-error="errors.tf1"
      :error-text="errors.messages.tf1"
      @input="setBetAmount"
    />
    <Searchfield
      v-if="!selectedUser"
      class="mb-24"
      :label="`Enter a player to bet against`"
      :placeholder="`Start typing to find a user`"
      :items="users"
      :selected="selectedUser"
      :is-error="errors.tf2"
      :error-text="errors.messages.tf2"
      :type="`user`"
      @on-input="searchUsers"
      @select="selectUserToBet"
    />
    <SelectedUser
      v-else
      :user="selectedUser"
      class="mb-24"
      @reset-selected="selectedUser = null"
    />
    <BetStrip
      class="mb-24"
      :label="`${fixture.homeTeam.name} to:`"
      :items="items"
      @prediction="updatePrediction"
    />
    <Searchfield
      class="mb-24"
      :label="`Enter a player to score`"
      :placeholder="`Start typing to find a player`"
      :items="searchedPlayers"
      :is-error="errors.tf3"
      :error-text="errors.messages.tf3"
      :type="`players`"
      @on-input="searchPlayers"
      @select="selectPlayerToScore"
    />
    <div class="player-list">
      <PlayerTile
        v-for="(player, index) in playersToScore"
        :key="`player_${index}be`"
        class="item"
        :player="player"
        @remove="removePlayer"
        @add-scorer="addFirstScorer"
        @remove-scorer="removeFirstScorer"
      />
    </div>
    <div class="actions">
      <Button :text="'Place bet'" @click="handleBet" />
    </div>
  </Modal>
</template>

<script>
import Modal from "~/components/ui/modals/ScaffoldModal.vue";
import BetStrip from "~/components/ui/BetStrip.vue";
import Searchfield from "~/components/ui/SearchField.vue";
import Textfield from "~/components/ui/Textfield.vue";
import PlayerTile from "~/components/ui/PlayerTile.vue";
import Button from "~/components/ui/Button.vue";
import SelectedUser from "~/components/ui/SelectedUser.vue";
export default {
  name: "BetModal",
  components: {
    Modal,
    BetStrip,
    SelectedUser,
    Button,
    Textfield,
    PlayerTile,
    Searchfield,
  },
  props: {
    showModal: {
      type: Boolean,
      required: false,
      default: false,
    },
    users: {
      type: Array,
      required: false,
      default: () => [],
    },
    players: {
      type: Array,
      required: false,
      default: () => [],
    },
    fixture: {
      type: Object,
      requried: false,
      default: () => {},
    },
  },
  data() {
    return {
      errors: {
        tf1: false,
        tf2: false,
        tf3: false,
        messages: {
          tf1: "",
          tf2: "",
          tf3: "",
        },
      },
      items: ["Win", "Draw", "Lose"],
      playersToScore: [],
      firstScorers: [],
      searchedPlayers: null,
      fixturePrediction: {},
      betAmount: 0,
      selectedUser: null,
      animateOut: false,
    };
  },
  methods: {
    clearFormData() {
      this.errors.tf1 = false;
      this.errors.tf2 = false;
      this.errors.tf3 = false;
    },
    validateForm() {
      this.clearFormData();
      if (!this.betAmount) {
        this.errors.tf1 = true;
      }
      if (!this.selectedUser) {
        this.errors.tf2 = true;
      }
      Object.values(this.errors).forEach((value) => {
        if (typeof value === "boolean" && value === true) {
          this.$store.commit("setSnackbar", {
            type: "error",
            show: true,
            text: "Please fill in the required fields",
          });
          return false;
        }
      });
      return true;
    },
    updatePrediction(pred) {
      const isDraw = pred.toLowerCase() === "draw";
      const homeWin =
        pred.toLowerCase() === "win"
          ? this.fixture.homeTeam.team_id
          : this.fixture.awayTeam.team_id;
      this.fixturePrediction = {
        decision: pred,
        draw: isDraw,
        winner: isDraw ? null : homeWin,
      };
    },
    setBetAmount(amount) {
      this.betAmount = amount;
    },
    addFirstScorer(player) {
      this.firstScorers.push(player);
    },
    removeFirstScorer(player) {
      this.firstScorers.pop(player);
    },
    summariseBet() {
      console.log("first scorers", this.firstScorers);
      console.log("players to score", this.playersToScore);
      console.log("bet amount", this.betAmount);
      console.log("user to bet against", this.selectedUser);
      console.log("prediction", this.fixturePrediction);
    },
    hideModal() {
      this.animateOut = true;
      setTimeout(() => {
        this.$emit("hide-modal");
        this.animateOut = false;
      }, 1000);
    },
    searchPlayers(query) {
      this.searchedPlayers = this.players.filter((el) =>
        el.name.toLowerCase().includes(query)
      );
    },
    selectUserToBet(user) {
      this.selectedUser = user;
    },
    selectPlayerToScore(player) {
      this.playersToScore.push(player);
    },
    removePlayer(player) {
      this.playersToScore.pop(player);
    },
    async handleBet() {
      if (this.validateForm()) {
        try {
          const isDraw = this.fixturePrediction.pred === "draw";
          const winner = this.fixturePrediction.winner;
          const payload = {
            user1: this.$auth.user.id,
            user2: this.selectedUser.id,
            amount: this.betAmount,
            match: this.fixture.match_id,
            winner,
            is_draw: isDraw,
          };
          const res = await this.$store.dispatch("bets/create", payload);
          const betId = res.id;
          await this.$store.dispatch("bets/addScorers", {
            players: this.playersToScore,
            id: betId,
          });
          this.hideModal();
          this.$store.commit("setSnackbar", {
            show: true,
            text: `Your bet with ${this.selectedUser.email} was successfully created`,
            type: "success",
          });
        } catch (e) {
          this.$store.commit("setSnackbar", {
            type: "error",
            text: "An error occurred " + e,
            show: true,
          });
          console.log(e);
        }
      }
    },
    searchUsers(query) {
      this.$emit("search-users", query);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/bet-modal";
</style>
