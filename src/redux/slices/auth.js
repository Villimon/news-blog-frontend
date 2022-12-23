import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
    const { data } = await axios.post('/login', params)
    return data
})
export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/me')
    return data
})
export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/register', params)
    return data
})



const initialState = {
    data: null,
    status: 'loading',

}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: {
        [fetchUserData.pending]: (state) => {
            state.data = null
            state.status = 'loading'
        },
        [fetchUserData.fulfilled]: (state, actions) => {
            state.data = actions.payload
            state.status = 'loaded'
        },
        [fetchUserData.rejected]: (state) => {
            state.data = null
            state.status = 'error'
        },
        // проверка на авторизацию 
        [fetchAuthMe.pending]: (state) => {
            state.data = null
            state.status = 'loading'
        },
        [fetchAuthMe.fulfilled]: (state, actions) => {
            state.data = actions.payload
            state.status = 'loaded'
        },
        [fetchAuthMe.rejected]: (state) => {
            state.data = null
            state.status = 'error'
        },
        // регистрация
        [fetchRegister.pending]: (state) => {
            state.data = null
            state.status = 'loading'
        },
        [fetchRegister.fulfilled]: (state, actions) => {
            state.data = actions.payload
            state.status = 'loaded'
        },
        [fetchRegister.rejected]: (state) => {
            state.data = null
            state.status = 'error'
        },

    }
})

export const selectIsAuth = state => Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions