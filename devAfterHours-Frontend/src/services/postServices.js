import axios from 'axios'
const API_URL = import.meta.env.VITE_POST_API_URL
import api from "../services/api"
// import {token} from '../context/AuthContext'

export const getPosts = async ()=>{
    const response = await api.get("/");
    return response.data;
}
export const getPostBySlug = async (slug)=>{
    const response = await api.get(`/${slug}`);
    return response.data
}

export const getManagePosts = async (token)=>{
    const response = await axios.get(`${API_URL}/manage`,{headers:{Authorization:`Bearer ${token}`}});
    const data = response.data;
    return data;
}

export const editPost = async (id,postData,token)=>{
    const response = await axios.patch(`${API_URL}/edit/${id}`,postData,{headers:{Authorization:`Bearer ${token}`}});
    const data = response.data;
    return data;
}

export const getPostForEdit = async (id,token)=>{
    const response = await axios.get(`${API_URL}/edit/${id}`,{headers:{Authorization:`Bearer ${token}`}});
    return response.data
}



export const createPost = async(data,token)=>{
    const response = await axios.post(`${API_URL}/createPost`,
        data,
        {headers:{Authorization:`Bearer ${token}`}}
    );
    console.log(response.data);
    return response.data
}

export const deletePost = async(id,token)=>{
    const response = await axios.delete(`${API_URL}/${id}`,
        {headers:{Authorization:`Bearer ${token}`}}
    )
    return response.data
}

