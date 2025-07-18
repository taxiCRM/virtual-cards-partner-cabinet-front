import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    force?: boolean | string[];
  }
}
