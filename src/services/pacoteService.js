import api from './api'

const pacoteService = {
    listarTodos: async () => {
        const response = await api.get('/api/pacotes')
        return response.data
    },
    buscarPorId: async (id) => {
        const response = await api.get(`/api/pacotes/${id}`)
        return response.data
    },
    buscarPorPreco: async (valor) => {
        const response = await api.get('/api/pacotes/busca-preco', { params: { valor } })
        return response.data
    },
    cadastrar: async (pacote) => {
        const response = await api.post('/api/pacotes', pacote)
        return response.data
    },
    atualizar: async (id, pacote) => {
        const response = await api.put(`/api/pacotes/${id}`, pacote)
        return response.data
    },
    excluir: async (id) => {
        const response = await api.delete(`/api/pacotes/${id}`)
        return response.data
    },
}

export default pacoteService