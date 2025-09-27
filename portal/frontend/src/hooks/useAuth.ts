import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getProfile, login, logout, refreshToken, register, initializeAuth } from '../services/authService';

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: 'admin' | 'staff' | 'member';
  locale: string;
  timezone: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signInWithOAuth: (provider: 'google' | 'apple', token: string) => Promise<void>;
  signUp: (input: { name: string; email: string; password: string; timezone: string; locale: string }) => Promise<void>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      initializeAuth();
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (error) {
        console.warn('Auth init failed', error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  const signIn = useCallback(async (credentials: { email: string; password: string }) => {
    const profile = await login(credentials);
    setUser(profile);
  }, []);

  const signUp = useCallback(async (input: { name: string; email: string; password: string; timezone: string; locale: string }) => {
    await register(input);
    const profile = await login({ email: input.email, password: input.password });
    setUser(profile);
  }, []);

  const signOut = useCallback(async () => {
    await logout();
    setUser(null);
  }, []);

  const signInWithOAuth = useCallback(async (provider: 'google' | 'apple', token: string) => {
    const profile = await login({ provider, token } as any);
    setUser(profile);
  }, []);

  const refresh = useCallback(async () => {
    const profile = await refreshToken();
    setUser(profile);
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, signIn, signInWithOAuth, signOut, signUp, refresh }),
    [user, isLoading, signIn, signInWithOAuth, signOut, signUp, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
