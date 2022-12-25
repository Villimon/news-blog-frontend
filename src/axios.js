import axios from 'axios'



const instance = axios.create({
    // baseURL: 'https://news-blog-backend.vercel.app'
    // baseURL: 'http://localhost:3003'
    baseURL: process.env.REACT_APP_API_URL
})



// на проверку есть ли токен или нет 
instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')

    return config
})

export default instance