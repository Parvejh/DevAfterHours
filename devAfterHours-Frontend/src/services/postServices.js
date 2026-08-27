import api from "../services/api"
// import {token} from '../context/AuthContext'

export const getPosts = async (search="",page=1,signal,category="")=>{
    const params = new URLSearchParams();
    if (search?.trim()) {
        params.append("search", search.trim());
    }

    params.append("page", page);

    if(category?.trim()){
        params.append("category",category.trim())
    }

    const query = params.toString();
    const response = await api.get(
        query ? `/posts?${query}` : "/posts",{
            signal
        }
    );
    return response.data;
}

export const getPostBySlug = async (slug)=>{
    const response = await api.get(`/posts/${slug}`);
    return response.data
}

export const getManagePosts = async ()=>{
    const response = await api.get(`/posts/manage`);
    return response.data;
}
// Before axios interceptors
// export const getManagePosts = async (token)=>{
//     const response = await axios.get(`${API_URL}/manage`,{headers:{Authorization:`Bearer ${token}`}});
//     const data = response.data;
//     return data;
// }

export const editPost = async (id,postData)=>{
    const response = await api.patch(`/posts/edit/${id}`,postData);
    return response.data;
}

export const getPostForEdit = async (id)=>{
    const response = await api.get(`/posts/edit/${id}`);
    return response.data
}



export const createPost = async(data)=>{
    const response = await api.post(`/posts/createPost`,data);
    return response.data
}

export const deletePost = async(id)=>{
    const response = await api.delete(`/posts/${id}`)
    return response.data
}

