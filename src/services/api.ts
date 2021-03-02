import axios, { AxiosRequestConfig } from 'axios';
import * as qs from 'qs';
import { PathLike } from 'fs';
import appConfig from '../app-config';
import * as auth from '../services/auth';

const config: AxiosRequestConfig = {
  baseURL: appConfig.apiUrl,
  headers: {
    common: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
    },
  },
  paramsSerializer: (params: PathLike) => qs.stringify(params, { indices: false }),
};

const api = axios.create(config);

api.interceptors.request.use(
  (config) => {
    const accessToken = auth.getAccessToken();
    if (accessToken) {
      config.headers.common.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const response = error.response;

      if (response.status === 401 && response.data?.error === 'invalid_token') {
        auth.refreshAccessToken().then((response) => {
          error.config.headers['Authorization'] = `Bearer ${response.data.access_token}`;
          return api.request(error.config);
        });
      }
      if (response.status === 404) {
        throw new Error(`${error.config.url} not found`);
      }
      throw new Error(error.response.message);
    } else if (error.request) {
      throw new Error(error.message);
    } else {
      throw new Error(error.message);
    }
  },
);

export default api;
