import axios from 'axios'
import store from '../store.js'

const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
})

api.interceptors.request.use((config) => {
    const token = store.getState().auth.token
    if (token) {
        config.headers.Authorization = 'Bearer ' + token
    }
    return config
}, (error) => Promise.reject(error))

export default api