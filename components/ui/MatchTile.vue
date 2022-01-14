<template>
  <div @click="handleTileClick">
    <div class="match-tile">
      <div class="match-tile_content">
        <div class="date">
          <div>{{ match.date.split("T")[1].replace("Z", "") }}</div>
          <div>{{ match.date.split("T")[0] }}</div>
        </div>
        <div class="match">
          <div class="teams">
            <div class="team" :class="teamStatus(match.homeTeam.name)">
              {{ match.homeTeam.name }}
              <div v-if="isFinished" class="score">
                {{ match.score.home_goals }}
              </div>
            </div>
            <div class="mh-16">vs</div>
            <div class="team" :class="teamStatus(match.awayTeam.name)">
              {{ match.awayTeam.name }}
              <div v-if="isFinished" class="score">
                {{ match.score.away_goals }}
              </div>
            </div>
          </div>
          <div v-if="isPostponed" class="postponed">PP</div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="match-tile">
    <div class="match-tile_content">
      Manchester United
      <div class="match-tile_content_date">12:00 Thu</div>
      Manchester City
    </div>
  </div> -->
</template>

<script>
export default {
  name: "MatchTile",
  props: {
    match: {
      type: Object,
      required: true,
    },
  },
  computed: {
    teamStatus() {
      return (team) => {
        let style = "";
        if (team === this.winner) style = "winner";
        else if (team !== this.winner && this.winner) style = "loser";
        else if (this.match.status === "POSTPONED") style = "postponed";
        else style = "draw";
        return style;
      };
    },
    isPostponed() {
      return this.match.status === "POSTPONED";
    },
    isFinished() {
      return this.match.status === "FINISHED";
    },
    winner() {
      const hasWinner = this.match.score.winner;
      const hasFinished = this.match.status === "FINISHED";
      return hasWinner ? hasWinner.name : hasFinished ? "Draw" : "";
    },
    hasScore() {
      return this.match.score;
    },
  },
  methods: {
    async handleTileClick() {
      if (this.match.status === "SCHEDULED") {
        return this.$router.push(`/fixture/${this.match.match_id}/`);
      }
      return await this.$store.commit("setSnackbar", {
        show: true,
        type: "error",
        text: "You cannot bet on this fixture as it has already been played",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/tiles/match";
</style>
