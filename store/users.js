export const actions = {
  async register(context, payload) {
    return await this.$axios.$post(`/api/users/register/`, payload);
  },
  async list(context, filter) {
    return await this.$axios.$get(`/api/users/?search=${filter}`);
  },
  async detail(context) {
    return await this.$axios.$get("/api/users/detail/");
  },
  async update(context, payload) {
    return await this.$axios.$patch("/api/users/update/", payload);
  },
};
