import { createDefaultApi } from 'shared/lib/api';
import { getConfigPath } from 'shared/lib/utils/getConfigPath';

export const baseMockURL = process.env.VITE_APP_API_URL;
export const baseURL = process.env.VITE_APP_API_URL;
export const authURL = process.env.VITE_APP_API_URL;

export const api = createDefaultApi({
  config: {
    configPath: getConfigPath(),
    key: 'API_URL',
  },
  onForbidden: error => {
    if (error.response.config.method !== 'get') {
      //   refreshPass();
    }
  },
});

// export const authBaseApi = createDefaultApi({
//   config: {
//     configPath: getConfigPath(),
//     key: "API_URL",
//   },
// });
