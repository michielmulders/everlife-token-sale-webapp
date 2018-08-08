import axios from '../axios';
import router from '../router';

export default {
  async signup(state, user) {
    const response = await axios.post('api/auth/register', user);
    localStorage.setItem('token', response.data.accessToken);
    state.commit('storeToken', response.data.accessToken);
    state.commit('storeUser', response.data.user);
    router.push({ path: '/dashboard' });
  },

  async login(state, user) {
    const response = await axios.post('api/auth/login', user);
    localStorage.setItem('token', response.data.accessToken);
    state.commit('storeToken', response.data.accessToken);
    state.commit('storeUser', response.data.user);
    router.push({ path: '/dashboard' });
  },

  updateProfile(state) {
    axios.get('api/account/profile').then(({ data }) => {
      state.commit('storeUser', data.user);
    })
  },

  clearAuthData(state) {
    localStorage.removeItem('token');
    state.commit('clearToken');
    router.push({ name: "login" });
  },

  async imgUpload(state, document) {
    let formData = new FormData();
    formData.append('imgFile', document.data);
    const response = await axios.post('api/kyc/uploadImg', formData);
    const documentURL = response.data.url;
    state.commit('setKycDoc', {
      key: document.key,
      url: documentURL
    });
  },

  async saveKycDocs(state, filesURL) {
    const response = await axios.post('api/kyc/saveKycDocs', filesURL);
    state.commit('saveKycDocs');
  },
}
