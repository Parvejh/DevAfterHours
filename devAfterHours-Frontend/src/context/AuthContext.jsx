import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { getCurrentUser } from "../services/authServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")))

    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState("")

    const login = (token,user) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user",JSON.stringify(user))
        setToken(token);
        setUser(user)
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null)
    };

    const isAuthenticated = !!token && !!user;

    // Validate the token
    useEffect(() => {
        const validateSession = async () => {
            const storedToken = localStorage.getItem("token");
            setError("")
            if (!storedToken) {
                setIsLoading(false);
                return;
            }

            try {
                const data = await getCurrentUser(storedToken);

                setToken(storedToken);
                setUser(data.user);

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            } catch(error) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                console.error(`Error in validating session : ${error}`)
                setError(error.response?.data?.message)
                setToken(null);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        validateSession();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAuthenticated,
                isLoading,
                error,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};