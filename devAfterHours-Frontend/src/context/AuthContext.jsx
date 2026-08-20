import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { getCurrentUser } from "../services/authServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [user,setUser] = useState(null)

    const [isLoading,setIsLoading] = useState(true);

    const login = (token,user) => {
        localStorage.setItem("token", token);
        setToken(token);
        setUser(user)
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null)
    };

    const isAuthenticated = !!token && !!user;

    // Validate the token
    useEffect(() => {
        const validateSession = async () => {
            const storedToken = localStorage.getItem("token");
            if (!storedToken) {
                setIsLoading(false);
                return;
            }

            try {
                const data = await getCurrentUser(storedToken);
                setToken(storedToken);
                setUser(data.user);
            } catch(error) {
                localStorage.removeItem("token");
                console.error(`Error in validating session : ${error}`)
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