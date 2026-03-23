// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { role, login, id } = action.payload.user
            if (role === 'student') {
                const phoneNumber = action.payload.user.phoneNumber
                const tgUserName = action.payload.user.tgUserName
                const email = action.payload.user.email
                state.user = { name: action.payload.user.name, role, login, id, classId: action.payload.user.classId, phoneNumber, tgUserName, email }
            } else if (role === 'admin' || role === 'class') {
                state.user = { name: action.payload.user.name, role, login, id }
            }

            state.isAuthenticated = true
        },
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
            localStorage.removeItem('token')
        }
    }
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
