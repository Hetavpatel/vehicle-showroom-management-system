import axios from 'axios';
import httpClient from './httpClient';
import { AuthUser } from '../hooks/useAuth';

type LoginPayload = { email: string; password: string } | { provider: 'google' | 'apple'; token: string };

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  timezone: string;
  locale: string;
};

type AuthResponse = {
  user: AuthUser;
  access_token: string;
  refresh_token: string;
};

type RefreshResponse = {
  user: AuthUser;
  access_token: string;
};

const ACCESS_TOKEN_KEY = 'wellnest.accessToken';
const REFRESH_TOKEN_KEY = 'wellnest.refreshToken';

const applyAccessToken = (token: string | null) => {
  if (token) {
    httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete httpClient.defaults.headers.common.Authorization;
    delete axios.defaults.headers.common.Authorization;
  }
};

export const initializeAuth = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  applyAccessToken(accessToken);
};

const persistTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  applyAccessToken(accessToken);
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  applyAccessToken(null);
};

export const login = async (payload: LoginPayload): Promise<AuthUser> => {
  const endpoint = 'provider' in payload ? '/auth/oauth' : '/auth/login';
  const { data } = await httpClient.post<AuthResponse>(endpoint, payload);
  persistTokens(data.access_token, data.refresh_token);
  return data.user;
};

export const register = async (payload: RegisterPayload): Promise<AuthUser> => {
  const { data } = await httpClient.post<AuthUser>('/auth/register', payload);
  return data;
};

export const logout = async (): Promise<void> => {
  await httpClient.post('/auth/logout', {});
  clearTokens();
};

export const refreshToken = async (): Promise<AuthUser> => {
  const refreshTokenValue = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshTokenValue) {
    throw new Error('No refresh token');
  }
  const { data } = await httpClient.post<RefreshResponse>('/auth/refresh', {
    access_token: localStorage.getItem(ACCESS_TOKEN_KEY),
    refresh_token: refreshTokenValue
  });
  persistTokens(data.access_token, refreshTokenValue);
  return data.user;
};

export const getProfile = async (): Promise<AuthUser> => {
  initializeAuth();
  const { data } = await httpClient.get<AuthUser>('/auth/profile');
  return data;
};
