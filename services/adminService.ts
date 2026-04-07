import apiClient from "./apiClient";

export interface ParentForAssignment {
  id: number | string;
  username: string;
  nationalId: string;
  phone: string;
}

export interface StudentDto {
  id: number | string;
  username?: string;
  name?: string;
  grade?: string;
  Grade?: string;
}

export interface NfcCardDto {
  id: number | string;
  uid: string;
  status: string;
}

export interface AdminLogDto {
  id: number | string;
  studentName: string;
  nfcUid: string;
  requestTime: string;
  status: string;
}

export interface RegisterStudentPayload {
  name: string;
  Grade: string;
  SchoolLat: number;
  SchoolLon: number;
}

export const adminService = {
  async getParentsForAssignment(): Promise<ParentForAssignment[]> {
    const { data } = await apiClient.get<ParentForAssignment[]>(
      "/api/v1/parent/student/assignment"
    );
    return data;
  },

  async getAllStudents(): Promise<StudentDto[]> {
    const { data } = await apiClient.get<StudentDto[]>(
      "/api/v1/student/parent/assignment"
    );
    return data;
  },

  async linkParentToStudent(
    parentId: number | string,
    studentId: number | string
  ): Promise<any> {
    const { data } = await apiClient.put(
      `/api/v1/student/link/parent/${parentId}/and/student/${studentId}`
    );
    return data;
  },

  async getNfcCards(): Promise<NfcCardDto[]> {
    const { data } = await apiClient.get<NfcCardDto[]>(
      "/api/v1/nfc/get/cards"
    );
    return data;
  },

  async linkNfcToStudent(
    studentId: number | string,
    nfcId: number | string
  ): Promise<any> {
    const { data } = await apiClient.post(
      `/api/v1/student/link/student/${studentId}/nfc/${nfcId}`
    );
    return data;
  },

  async getAdminLogs(): Promise<AdminLogDto[]> {
    const { data } = await apiClient.get<AdminLogDto[]>(
      "/api/v1/exitlog/admin/logs"
    );
    return data;
  },

  async registerStudent(payload: RegisterStudentPayload): Promise<any> {
    const { data } = await apiClient.post(
      "/api/v1/student/add/new/student",
      payload
    );
    return data;
  },
};
