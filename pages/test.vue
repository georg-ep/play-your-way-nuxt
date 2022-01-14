<template>
  <div class="content">
    <div class="title">Upcoming fixtures</div>

    <MatchTile class="tile" />
    <MatchTile class="tile" />
    <MatchTile />
  </div>
</template>

<script>
import MatchTile from "~/components/ui/MatchTile.vue";
export default {
  name: "Test",
  auth: false,
  components: {
    MatchTile,
  },
  data() {
    return {
      request: {
        user2: {
          name: "Alex",
        },
        amount: 60,
        match: {
          date: new Date().toLocaleString(),
          homeTeam: {
            name: "Man u",
          },
          awayTeam: { name: "Chelsea" },
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/dashboard";
</style>
