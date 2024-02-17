import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import axios from 'axios';

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    const { token } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      name,
      email,
      password,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
