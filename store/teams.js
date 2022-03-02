export const actions = {
  async list(context) {
    return await this.$axios.$get(`/api/football/team/list/`);
  },
  async detail(context, id) {
    return await this.$axios.$get(`/api/football/team/detail/${id}/`);
  },
};
