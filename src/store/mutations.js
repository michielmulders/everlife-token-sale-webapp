export default {
  storeToken(state, token) {
    state.token = token;
  },

  storeUser(state, user) {
    state.user.name = user.name;
    state.user.email = user.email;
    state.user.kyc = user.kyc;
    state.user.whitelist = user.whitelist;
    state.user.contributions = user.contributions;
  },

/*   outcome/
 * This function will clear the token and it will set it's value to null.
 *  
 */

  clearToken(state) {
    state.token = null;
  },
}
