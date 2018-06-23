export default {
  storeToken(state, token) {
    state.token = token;
  },

  storeUser(state, user) {
    state.user.name = user.name;
    state.user.email = user.email;
    state.user.kyc = user.kyc;
    state.user.whitelist = user.whitelist;
  },

  clearToken(state) {
    state.token = null;
  },
}
