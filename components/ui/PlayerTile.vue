<template>
  <div class="player-tile">
    <img
      class="remove"
      src="~/assets/icons/remove-white.svg"
      @click="removeTile"
    />
    <div>{{ player.name }}</div>
    <div class="player-tile_trailing">
      <div class="player-tile_checkbox" @click="toggleFirstScorer">
        <img v-if="firstScorer" src="~/assets/icons/check-cyan.svg" />
      </div>
      (first scorer)
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerTile",
  props: {
    player: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      firstScorer: false,
    };
  },
  methods: {
    toggleFirstScorer() {
      this.firstScorer = !this.firstScorer;
      if (this.firstScorer) {
        return this.$emit("add-scorer", this.player);
      }
      this.$emit("remove-scorer", this.player);
    },
    removeTile() {
      this.$emit("remove", this.player);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/tiles/player";
</style>
