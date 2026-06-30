import api from './api'

const cronogramaService = {
    listarTodos: async () => {
        const response = await api.get('/api/cronogramas')
        return response.data
    },
    buscarPorId: async (id) => {
        const response = await api.get(`/api/cronogramas/${id}`)
        return response.data
    },
    cadastrar: async (cronograma) => {
        const response = await api.post('/api/cronogramas', cronograma)
        return response.data
    },
    atualizar: async (id, cronograma) => {
        const response = await api.put(`/api/cronogramas/${id}`, cronograma)
        return response.data
    },
    excluir: async (id) => {
        const response = await api.delete(`/api/cronogramas/${id}`)
        return response.data
    },
}

export default cronogramaService