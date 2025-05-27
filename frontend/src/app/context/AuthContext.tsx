'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import API from '../../utils/api'; // your Axios instance
import { useRouter } from 'next/navigation';

type User = {
  _id: string;
  username: string;
  // add more fields as needed
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await API.get('/auth/me');
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    await API.post('/auth/logout');
    setUser(null);
    router.push('/login');
    await fetchUser(); 
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for consuming the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Error');
  return context;
};