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

  
  /*      problem/
 * We need to have some way of associating a real-world user with our
 * database user.
 *
 *      way/
 * We will use the user's email as a unique identifier.
 * setting the token from local storage
 * commmiting storeUser and storeToken for given state
 * once the authentiction is valid 
 * user will redirect to dashboard
 */
  async login(state, user) {
    const response = await axios.post('api/auth/login', user);
    localStorage.setItem('token', response.data.accessToken);
    state.commit('storeToken', response.data.accessToken);
    state.commit('storeUser', response.data.user);
    router.push({ path: '/dashboard' });
  },

  
   /*      outcome/
  * This function will update the user profile 
  * it will commit the state as store user 
  */
  updateProfile(state) {
    axios.get('api/account/profile').then(({ data }) => {
      state.commit('storeUser', data.user);
    })
  },

  /*      outcome/
  * This function will clear the token from local storage
  * it will commit the state as clear token 
  * it will return to login
  */
  
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
