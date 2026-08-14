import axios from 'axios'
const API_URL = import.meta.env.VITE_POST_API_URL

export const getPosts = async ()=>{
    const response = await axios.get(API_URL);
    const data = response.data;
    return data;
}

export const getPostBySlug = async (slug)=>{
    const response = await axios.get(`${API_URL}/${slug}`);
    return response.data
}