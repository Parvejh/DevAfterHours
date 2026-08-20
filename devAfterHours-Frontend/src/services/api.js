import axios from "axios";
const API_URL = "http://localhost:8000/api/"

const api = axios.create({
    baseURL:API_URL
})

// Setting api interceptor to attach JWT to every request
api.interceptors.request.use(
    (config)=>{
    const token = localStorage.getItem("token");

    if(token)
        config.headers.Authorization = `Bearer ${token}`

    return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)  

// Setting api response interceptor for centralized handling of unauthorized responses
api.interceptors.response.use(
    (response)=>{
        return response
    },
    (error)=>{
        if(error.response?.status === 401){
            localStorage.removeItem("token")

            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default api 