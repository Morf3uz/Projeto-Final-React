import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: localStorage.getItem('token') !== null,
        token: localStorage.getItem('token'),
        usuarioLogado: localStorage.getItem('usuarioLogado')
            ? JSON.parse(localStorage.getItem('usuarioLogado'))
            : null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true
            state.token = action.payload.token
            state.usuarioLogado = action.payload.usuario
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.token = null
            state.usuarioLogado = null
            localStorage.removeItem('token')
            localStorage.removeItem('usuarioLogado')
        },
    },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer