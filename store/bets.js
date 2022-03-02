export const actions = {
  async create(context, payload) {
    return await this.$axios.$post(`/api/bets/create/`, payload);
  },
  async pending(context) {
    return await this.$axios.$get(`/api/bets/pending/`);
  },
  async addScorers(context, payload) {
    const players = payload.players;
    const betId = payload.id;
    for (let i = 0; i < players.length; i++) {
      const data = {
        player: players[i].player_id,
        bet: betId,
      };
      await this.$axios.$post(`/api/bets/add-player/`, data);
    }
  },
  async info(context, id) {
    return await this.$axios.$get(`/api/bets/detail/${id}/`);
  },
  async received(context) {
    return await this.$axios.$get(`/api/bets/received/`);
  },
  async confirmed(context) {
    return await this.$axios.$get(`/api/bets/mine/`);
  },
  async accept(context, betId) {
    return await this.$axios.$post(`/api/bets/accept/${betId}/`);
  },
};
