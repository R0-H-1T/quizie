import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin, signup, signout } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("access_token");
        if (storedToken) {
            setUser(true); // User is logged in if token exists
        }
    }, []);

    const login = async (data) => {
        try {
            const res = await signin(data);
            console.log(res.data.access_token)
            localStorage.setItem("access_token", res.data.access_token); // Store token
            localStorage.setItem("refresh_token", res.data.refresh_token); // Store token
            setUser(true)
            navigate('/');
            return { success: true };
        } catch (error) {
            console.error('Login failed', error);
            return { success: false, message: "Invalid email or password" };
        }
    };

    const register = async (data) => {
        try {
            const res = await signup(data);
            if (res.status == 201) {
                navigate('/login')
            }
        } catch (error) {
            console.error('Signup failed', error);
        }
    };

    const logout = async () => {
        try {
            await signout(); // Call backend logout (optional)
          } catch (error) {
            console.error("Logout failed", error);
          }
          localStorage.removeItem("access_token"); // Remove token
          setUser(null);
          navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
        {children}
      </AuthContext.Provider>
    );
};