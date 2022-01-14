export const actions = {
  async register(context, payload) {
    return await this.$axios.$post(`/api/users/register/`, payload);
  },
  async list(context, filter) {
    return await this.$axios.$get(`/api/users/?search=${filter}`);
  },
};
