export default {
    token(state) {
        return state.token;
    },

    isLoggedIn(state, getters) {
        return !!getters.token;
    },

    user(state) {
        return state.user;
    },

    everToken(state){
        return state.everToken;
    },
}