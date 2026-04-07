import apiClient from "./apiClient";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterParentPayload {
  username: string;
  phone: string;
  email: string;
  password: string;
  nationalId: string;
}

export interface RegisterParentResponse {
  message: string;
}

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await apiClient.post<LoginResponse>(
      "/api/v1/auth/login",
      payload
    );
    return data;
  },

  async registerParent(
    payload: RegisterParentPayload
  ): Promise<RegisterParentResponse> {
    const { data } = await apiClient.post<RegisterParentResponse>(
      "/api/v1/auth/register/parent",
      payload
    );
    return data;
  },
};
