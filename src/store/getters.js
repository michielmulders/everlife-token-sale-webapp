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

    isDocsAvailable(state) {
        return state.isDocsAvailable;
    },

    isDocsUploaded(state) {
        return state.isDocsUploaded;
    },

    getKycDocs (state) {
        return state.user.kycDocs;
    },
    
    idmStatus(state) {
        return state.user.idmStatus;
    } 
}