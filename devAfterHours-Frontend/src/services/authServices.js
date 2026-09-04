import api from './api'

export const loginUser = async (credentials) => {
    const response = await api.post("/auth/login", credentials);

    return response.data;
};

export const getCurrentUser = async()=>{
    // -- The API mounts this endpoint below /api/auth, so /me caused a 404 after page refresh.
    const response = await api.get("/auth/me");
    return response.data;
}

export const registerUser = async (credentials) => {
    const response = await api.post("/auth/register", credentials);
    return response.data;
};
