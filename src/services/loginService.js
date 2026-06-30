import api from './api.js'

const loginService = {
    login: async (credenciais) => {
        const response = await api.post('/api/auth/login', credenciais)
        return response.data
    },
}

export default loginService