import { notification } from 'antd';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import stableStringify from 'fast-json-stable-stringify';
import Cookies from 'js-cookie';
import { LRUCache } from 'lru-cache';
import { TCreateDefaultApi as PPTCreateDefaultApi } from 'pay-people-ui-kit';

import { STORAGE_TOKEN_KEY } from 'entities/current-user';

import { Path } from '../consts/path';
import { getBaseUrlByConfig } from './getBaseUrlByConfig';

type CachedResponse = Pick<AxiosResponse, 'data' | 'status' | 'statusText' | 'headers'>;

const cache = new LRUCache<string, CachedResponse>({
  max: 100,
  ttl: 1000 * 60,
});

const normalizeReqData = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(normalizeReqData);
  }

  if (typeof data === 'object' && data !== null) {
    return Object.keys(data).reduce((acc: any, key) => {
      acc[key] = normalizeReqData(data[key as keyof typeof data]);
      return acc;
    }, {});
  }

  if (data === '') {
    return undefined;
  }

  return data;
};

export type TCreateDefaultApi = PPTCreateDefaultApi & {
  onForbidden?: (error: any) => void;
};

export const createDefaultApi = ({ on404, onUnauthorized, onForbidden, config: accessConfig }: TCreateDefaultApi) => {
  const api = axios.create();

  const inFlightRequests = new Map<string, Promise<AxiosResponse>>();

  const originalGet = api.get.bind(api);

  api.get = async <T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> => {
    const key = stableStringify({ url, params: config?.params });
    const force = config?.force;

    if (force === true) {
      cache.delete(key);
    }

    if (Array.isArray(force)) {
      for (const segment of force) {
        if (url.includes(segment)) {
          cache.delete(key);
        }
      }
    }

    if (cache.has(key)) {
      const cached = cache.get(key)!;
      return {
        data: cached.data,
        status: cached.status,
        statusText: cached.statusText,
        headers: cached.headers,
        config: config || {},
        request: {},
        __fromCache: true,
      } as R;
    }

    if (inFlightRequests.has(key)) {
      return inFlightRequests.get(key)! as Promise<R>;
    }

    const req = originalGet(url, config)
      .then(res => {
        cache.set(key, {
          data: res.data,
          status: res.status,
          statusText: res.statusText,
          headers: res.headers,
        });
        inFlightRequests.delete(key);
        return res;
      })
      .catch(err => {
        inFlightRequests.delete(key);
        throw err;
      });

    inFlightRequests.set(key, req);
    return req as R;
  };

  api.interceptors.request.use(async config => {
    const { force, url } = config;

    if (force === true) {
      const firstAnchor = url?.replace(/^\/+|\/+$/g, '').split('/')[0] || '';
      if (firstAnchor) {
        cache.forEach((_, cacheKey) => {
          const parsed = JSON.parse(cacheKey);
          if (parsed.url.includes(firstAnchor) || parsed.url.includes(Path.LOGS)) {
            cache.delete(cacheKey);
            inFlightRequests.delete(cacheKey);
          }
        });
      }
    } else if (Array.isArray(force)) {
      for (const segment of force) {
        cache.forEach((_, cacheKey) => {
          const parsed = JSON.parse(cacheKey);
          if (parsed.url.includes(segment)) {
            cache.delete(cacheKey);
            inFlightRequests.delete(cacheKey);
          }
        });
      }
    }

    if (accessConfig) {
      const baseURL = await getBaseUrlByConfig(accessConfig);
      if (baseURL) {
        config.baseURL = baseURL;
      }
    }

    const token = Cookies.get(STORAGE_TOKEN_KEY);

    config.headers.Authorization = `Bearer ${token}`;

    if (config.data === '') {
      config.data = null;
      console.error(`Request body of ${config.url} is empty!`);
    } else if (config.headers['Content-Type'] !== 'multipart/form-data') {
      config.data = normalizeReqData(config.data);
    }

    return config;
  });

  api.interceptors.response.use(
    response => {
      if (response.config.method === 'get') {
        const key = stableStringify({
          url: response.config.url,
          params: response.config.params,
        });

        cache.set(key, {
          data: response.data,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        });
      }

      return response;
    },
    error => {
      if (error.__fromCache) {
        return Promise.resolve(error);
      }
      if (error.response?.status === 401 && error.response?.data?.error !== 'Bad credentials.') {
        Cookies.remove(STORAGE_TOKEN_KEY);
        onUnauthorized?.();
      }
      if (error.response?.status === 500) {
        notification.error({
          message: 'Сервер не отвечает',
          description: 'Попробуйте позднее',
        });
      }
      if (error.response?.status === 404) {
        if (on404) {
          on404();
        } else {
          notification.error({
            message: 'Ошибка при получении данных',
          });
        }
      }
      if (error.response?.status === 403) {
        if (onForbidden) {
          onForbidden(error);
        }
      }
      return Promise.reject(error);
    },
  );

  return api;
};
