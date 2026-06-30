import api from './api'

const destinoService = {
    listarTodos: async () => {
        const response = await api.get('/api/destinos')
        return response.data
    },
    buscarPorId: async (id) => {
        const response = await api.get(`/api/destinos/${id}`)
        return response.data
    },
    listarPorCategoria: async (categoria) => {
        const response = await api.get(`/api/destinos/categoria/${categoria}`)
        return response.data
    },
    cadastrar: async (destino) => {
        const response = await api.post('/api/destinos', destino)
        return response.data
    },
    atualizar: async (id, destino) => {
        const response = await api.put(`/api/destinos/${id}`, destino)
        return response.data
    },
    excluir: async (id) => {
        const response = await api.delete(`/api/destinos/${id}`)
        return response.data
    },
}

export default destinoService