import { useState } from "react";
import { useContext, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user'))
    );

    const login = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user)
    }

    const logout = () => {
        localStorage.clear();
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{ login, logout, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);