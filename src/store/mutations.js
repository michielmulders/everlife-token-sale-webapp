export default {
  storeToken(state, token) {
    state.token = token;
  },

  storeUser(state, user) {
    state.user.name = user.name;
    state.user.email = user.email;
    state.user.kyc = user.kyc;
    state.user.whitelist = user.whitelist;
    state.user.ca = user.ca;
  },

  clearToken(state) {
    state.token = null;
  },

  caAddress(state, ca) {
    state.contribution.public = ca;
    state.user.ca = ca;
  },

  secret(state, secret){
    state.contribution.secret = secret;
  }
}
