import jwtDecode, { JwtPayload } from 'jwt-decode';
import appConfig from '../appConfig';
import api from './api';

type Jwt = JwtPayload & {
  authorities: string[];
  user_name: string;
  name: string;
};

type JwtResponse = {
  access_token: string;
  expires_in: number;
  jti: string;
  name: string;
  scope: string | string[];
  token_type: string;
};

const ACCESS_TOKEN_KEY = 'access-token';
const tokenUrl = `${api.defaults.baseURL}/oauth/token`;
const tokensRevokeUrl = `${api.defaults.baseURL}/tokens/revoke`;

const getEncodedCredentials = () => {
  const buffer = new Buffer(`${appConfig.clientId}:${appConfig.clientSecret}`);
  return buffer.toString('base64');
};

const storeToken = (accessToken: string) => {
  try {
    setAccessToken(accessToken);
  } catch (e) {
    console.log('storeToken:', e);
  }
};

const clearAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

const isAccessTokenInvalid = () => {
  const accessToken = getAccessToken();
  if (accessToken) {
    return isExpiredToken(accessToken);
  }
  return true;
};

const hasPermission = (permission: string) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    const jwt = jwtDecode(accessToken) as Jwt;
    return jwt && jwt.authorities.includes(permission);
  }
  return false;
};

export const hasAnyPermission = (permissions: string[]) => {
  for (const permission of permissions) {
    if (hasPermission(permission)) {
      return true;
    }
  }
  return false;
};

export const getUsername = () => {
  const accessToken = getAccessToken();
  if (accessToken) {
    const jwt = jwtDecode(accessToken) as Jwt;
    if (jwt) {
      return jwt.name;
    }
    return null;
  }
  return null;
};

const isExpiredToken = (token: string) => {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    if (exp) {
      return Date.now() >= exp * 1000;
    }
    return true;
  } catch (e) {
    console.log('JWT DECODE ERROR', e);
    return true;
  }
};

const setAccessToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

export const isAuthenticated = () => {
  return !isAccessTokenInvalid();
};

export const signIn = async (username: string, password: string) => {
  const credentials = getEncodedCredentials();
  const body = `username=${username}&password=${password}&grant_type=password&scope=read`;
  const headers = {
    Accept: '*/*',
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${credentials}`,
  };
  const response = await api.post<JwtResponse>(tokenUrl, body, { headers, withCredentials: true });
  storeToken(response.data.access_token);
  return response.data;
};

export const signOut = async () => {
  await api.delete(tokensRevokeUrl, { withCredentials: true });
  return clearAccessToken();
};

export const refreshAccessToken = async () => {
  const credentials = getEncodedCredentials();
  const body = 'grant_type=refresh_token';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${credentials}`,
  };
  const response = await api.post<JwtResponse>(tokenUrl, body, { headers, withCredentials: true });
  storeToken(response.data.access_token);
  return response;
};
