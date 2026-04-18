import axios from "axios";
import { tokenService } from "./tokenService";
let uniIp = '192.168.100.37';
export const API_BASE_URL = `http://${uniIp}:8080`;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(async (config) => {
  
  if (config.url && config.url.includes('/api/v1/auth/')) {
    return config;
  }

  const token = await tokenService.get();
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
