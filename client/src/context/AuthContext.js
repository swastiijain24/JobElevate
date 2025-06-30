import { createContext, useState } from 'react';

//stores global login info
export const AuthContext = createContext();

// provides login info to entire app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.paarse(storedUser) : null;
    });

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };
    return (
        <AuthContext.Provider value ={{user,setUser, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

