import axios from '../axios';
import router from '../router';

export default {
  async signup(state, user) {
    try{
      var response = await axios.post('api/auth/register', user)
    }
    catch(error){
      console.log(error);
    }
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

  login(state, user) {
    axios.post('api/auth/login', user).then(response => {
      localStorage.setItem('token', response.data.accessToken);
      state.commit('storeToken', response.data.accessToken);
      state.commit('storeUser', response.data.user);
      router.push({ path: '/dashboard' });
    }).catch((error) => {
      console.log(error);
    })
  },

  updateProfile(state) {
    axios.get('api/account/profile').then(({ data }) => {
      state.commit('storeUser', data.user);
    })
  },

  clearAuthData(state) {
    localStorage.removeItem('token');
    state.commit('clearToken');
    router.push({ path: '/' });
  },

  storeCaAddress(state, ca) {
    axios.post('api/account/updateca', { ca: ca }).then(({ data }) => {
      state.commit('caAddress', ca);
    }).catch(function (error) {
      console.log(error);
    })
  }
}
