import axios from 'axios'



const instance = axios.create({
    baseURL: 'http://localhost:3003'
})

// на проверку есть ли токен или нет 
instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')

    return config
})

export default instance