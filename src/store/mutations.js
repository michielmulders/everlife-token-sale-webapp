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
    state.user.kycDocs = user.kycDocs;
    state.user.idmStatus = user.idmStatus;
    state.isDocsAvailable = !!user.kycDocs.document1;
  },

  clearToken(state) {
    state.token = null;
  },

  setKycDoc(state, document) {
    state.user.kycDocs[document.key] = document.url;
  },

  saveKycDocs(state) {
    state.isDocsUploaded = true;
    state.isDocsAvailable = true;
  }
}
