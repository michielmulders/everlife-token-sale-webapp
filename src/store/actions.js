import axios from '../axios';
import router from '../router';

export default {
  async signup(state, user) {
    const response = await axios.post('api/auth/register', user)
    localStorage.setItem('token', response.data.accessToken);
    state.commit('storeToken', response.data.accessToken);
    state.commit('storeUser', {
      name: user.name,
      email: user.email,
      kyc: false,
      whitelist: false,
      ca: null
    })
    router.push({ path: '/dashboard' });
  },

  async login(state, user) {
    const response = await axios.post('api/auth/login', user);
    localStorage.setItem('token', response.data.accessToken);
    state.commit('storeToken', response.data.accessToken);
    state.commit('storeUser', response.data.user);
    router.push({ path: '/dashboard' });
    // return response;
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

  storeContributionData(state, { ca, xlmAmount }) {
    axios.post('api/account/payment', { ca: ca, xlmAmount: xlmAmount }).then(({ data }) => {
      state.commit('caAddress', ca);
    }).catch(function (error) {
      console.log(error);
    })
  }
}
