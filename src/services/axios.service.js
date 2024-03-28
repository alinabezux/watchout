import axios from "axios";
import token from "../api/token";

const axiosService = axios.create({ baseURL: 'https://api.themoviedb.org/3/' });
axiosService.interceptors.request.use((config) => {
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})


const axiosServiceV4 = axios.create({ baseURL: 'https://api.themoviedb.org/4/' });

axiosServiceV4.interceptors.request.use((config) => {
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})


export {axiosService, axiosServiceV4};
