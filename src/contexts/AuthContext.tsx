import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';

type AuthContextType = {
    token: string
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string>('');

    async function fetchToken() {
        try {
            console.log(import.meta.env, 'AKA')
            const res = await axios.post(
                `http://localhost:8081/auth`, { username: import.meta.env.VITE_TOKEN_USERNAME, password: import.meta.env.VITE_TOKEN_PASSWORD }
            );
            const token = res.data.token
            setToken(token);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchToken()
    }, [])

    return (
        <AuthContext.Provider value={{ token }}>
            {children}
        </AuthContext.Provider>
    );
};

