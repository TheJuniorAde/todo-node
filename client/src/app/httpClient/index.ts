import axios, { AxiosRequestConfig } from 'axios';
import { environment } from 'src/environments/environment';

export interface RequestConfig extends AxiosRequestConfig {
  host: string;
}

function setHeaders(existingHeaders: any) {
  const headers = {
    Accept: 'application/json',
  };

  return {
    ...existingHeaders,
    ...headers,
  };
}

function buildConfig(config: RequestConfig): AxiosRequestConfig {
  const { host, ...axiosConfig } = config;

  axiosConfig.baseURL = environment.apiUrl;
  axiosConfig.headers = setHeaders(axiosConfig.headers);

  return axiosConfig;
}

export default function api(config: RequestConfig) {
  return axios.create(buildConfig(config));
}
