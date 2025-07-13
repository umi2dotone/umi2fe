/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🚀 new

  const login = async (googleToken) => {
    const res = await axios.post('https://api.umi2.one/auth/google', { token: googleToken });
    const jwt = res.data.token;
    sessionStorage.setItem('token', jwt);
    const meRes = await axios.get('https://api.umi2.one/auth/me', {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    setUser(meRes.data);
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setUser(null);
  };

    // 👀 Auto-login if token exists in sessionStorage
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.get('https://api.umi2.one/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setUser(res.data))
        .catch(() => sessionStorage.removeItem('token'))
        .finally(() => setLoading(false)); // ✅ done loading
    } else {
      setLoading(false);
    }
  }, []);

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);