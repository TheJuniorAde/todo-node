import axios, { AxiosRequestConfig } from "axios"
import { environment } from "src/environments/environment"

const buildConfig = (config: AxiosRequestConfig): AxiosRequestConfig => {
  config.baseURL = environment.apiUrl
  config.headers = {
    ...config.headers,
    Accept: "application/json",
  }

  return config
}

export default function api(config: AxiosRequestConfig) {
  return axios.create(buildConfig(config))
}
