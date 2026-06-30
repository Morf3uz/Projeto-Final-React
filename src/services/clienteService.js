import api from './api'

const clienteService = {
    listarTodos: async () => {
        const response = await api.get('/api/clientes')
        return response.data
    },
    buscarPorId: async (id) => {
        const response = await api.get(`/api/clientes/${id}`)
        return response.data
    },
    buscarPorCpf: async (cpf) => {
        const response = await api.get(`/api/clientes/cpf/${cpf}`)
        return response.data
    },
    cadastrar: async (cliente) => {
        const response = await api.post('/api/clientes', cliente)
        return response.data
    },
    atualizar: async (id, cliente) => {
        const response = await api.put(`/api/clientes/${id}`, cliente)
        return response.data
    },
    excluir: async (id) => {
        const response = await api.delete(`/api/clientes/${id}`)
        return response.data
    },
}

export default clienteService