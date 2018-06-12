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

    contribution(state){
        return state.contribution;
    },

    everToken(state){
        return state.everToken;
    },
}