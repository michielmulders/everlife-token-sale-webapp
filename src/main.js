// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from './store'
import './filters/dateFilters' 

Vue.use(Vuetify)
Vue.use(AsyncComputed);

Vue.config.productionTip = false

/* eslint-disable no-new */
const vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  beforeCreate() {
    const token = localStorage.getItem('token');
    if(token){
      this.$store.commit('storeToken', token);
    }
	}
})


// axios.defaults.baseURL = 'http://192.168.43.192:3000';
// axios.interceptors.request.use(function(config){
//   console.log('** request made **');
//   console.log(store.getters.token); 
// })
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
