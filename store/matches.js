export const actions = {
  async fetchGameweek(context) {
    return await this.$axios.$get("/api/football/fetch-current-gameweek/");
  },
  async matches(context, gameweek) {
    return await this.$axios.$get(`/api/football/fixtures/${gameweek}/`);
  },
  async thisGameweek(context) {
    return await this.$axios.$get("/api/football/fixtures/current-gameweek/");
  },
  async detail(context, id) {
    return await this.$axios.$get(`/api/football/fixture/${id}/`);
  },
};
