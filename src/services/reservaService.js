import api from './api'

const reservaService = {
    listarTodas: async () => {
        const response = await api.get('/api/reservas')
        return response.data
    },
    buscarPorId: async (id) => {
        const response = await api.get(`/api/reservas/${id}`)
        return response.data
    },
    cadastrar: async (reserva) => {
        const response = await api.post('/api/reservas', reserva)
        return response.data
    },
    atualizar: async (id, reserva) => {
        const response = await api.put(`/api/reservas/${id}`, reserva)
        return response.data
    },
    excluir: async (id) => {
        const response = await api.delete(`/api/reservas/${id}`)
        return response.data
    },
}

export default reservaService