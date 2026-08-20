import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (credentials)=>{

    const response = await axios.post(
        `${API_URL}/login`,
        credentials
    );

    return response.data
}

export const getCurrentUser = async(token)=>{
    const response = await axios.get(`${API_URL}/me`,{headers:{Authorization:`Bearer ${token}`}});
    return response.data;
}