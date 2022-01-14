export const state = () => ({
  loading: false,
  snackbar: { show: false, text: "", type: "" },
});

export const mutations = {
  setLoading(state, value) {
    state.loading = value;
  },
  setSnackbar(state, snackbar) {
    state.snackbar = snackbar;
  },
};

export const getters = {
  loading: (state) => state.loading,
};
