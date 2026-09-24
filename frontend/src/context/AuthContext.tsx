import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  authUser: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'connect_auth';
const USERS_KEY = 'connect_users';

// Default registered users (mock)
const DEFAULT_USERS = [
  { id: 1001, name: 'Aman Kukreti', email: 'aman.kukreti@connect.dev', password: 'admin123', role: 'ADMIN' },
  { id: 1002, name: 'Rohit Gaira', email: 'rohit.gaira@connect.dev', password: 'lead123', role: 'LEAD' },
  { id: 1003, name: 'Aditya Thapliyal', email: 'aditya.thapliyal@connect.dev', password: 'user123', role: 'BASIC' },
  { id: 1004, name: 'Sameer Singh Bhandari', email: 'sameer.bhandari@connect.dev', password: 'user123', role: 'BASIC' },
];

interface StoredUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

const getStoredUsers = (): StoredUser[] => {
  try {
    const saved = localStorage.getItem(USERS_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return DEFAULT_USERS;
};

const saveStoredUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth state on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setAuthUser(JSON.parse(saved));
      }
    } catch {}
    // Small delay to show splash / avoid flash
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));

    const users = getStoredUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (!found) {
      return { success: false, error: 'Invalid email or password. Please try again.' };
    }

    const user: AuthUser = { id: found.id, name: found.name, email: found.email, role: found.role };
    setAuthUser(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return { success: true };
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));

    const users = getStoredUsers();

    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const newUser: StoredUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: 'BASIC',
    };

    const updatedUsers = [...users, newUser];
    saveStoredUsers(updatedUsers);

    const user: AuthUser = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
    setAuthUser(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return { success: true };
  };

  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!authUser, authUser, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
