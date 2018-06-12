import Axios from 'axios';
import store from './store';

const axios = Axios.create({
    baseURL: 'http://localhost:3000'
})

axios.interceptors.request.use(function (config) {
    config.headers.Authorization = store.getters.token;
    return config;
})

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    if (error.response.status === 401) {
        store.dispatch('clearAuthData');
    }

    return Promise.reject(error);
});
export default axios;
