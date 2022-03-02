export const actions = {
  async fetchGameweek(context) {
    return await this.$axios.$get("/api/football/fetch-current-gameweek/");
  },
  async upcoming(context) {
    return await this.$axios.$get("/api/football/fixtures/upcoming/");
  },
  async matches(context, { filters, gameweek }) {
    const baseUrl = "/api/football/fixtures/";
    if (gameweek) return await this.$axios.$get(`${baseUrl}${gameweek}/`);
    return await this.$axios.$get(`${baseUrl}${filters}`);
  },
  async thisGameweek(context) {
    return await this.$axios.$get("/api/football/fixtures/current-gameweek/");
  },
  async detail(context, id) {
    return await this.$axios.$get(`/api/football/fixture/${id}/`);
  },
};
