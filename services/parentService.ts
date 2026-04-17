import apiClient from "./apiClient";

export interface AttendanceLogDto {
  studentName: string;
  nfcUid: string;
  requestTime: string;
  status: string;
}

export interface MyStudentDto {
  id: number;
  username: string;
  grade: string;
}

export interface CongestionDto {
  avgJamFactor: number;
  status: string;
}

export interface PickupRequestDto {
  parentLat: number;
  parentLon: number;
}

export const parentService = {
  async pickupRequest(
    studentId: number,
    body: PickupRequestDto
  ): Promise<void> {
    await apiClient.post(
      `/api/v1/parent/exit/request/student/${studentId}`,
      body
    );
  },

  async sendOtp(): Promise<void> {
    await apiClient.post("/api/v1/parent/send-otp");
  },

  async verifyOtp(otp: number): Promise<void> {
    await apiClient.post(`/api/v1/parent/verify-otp/${otp}`);
  },

  async verifyBiometric(): Promise<void> {
    await apiClient.post("/api/v1/parent/biometric-auth");
  },
  async getAttendanceLogs(): Promise<AttendanceLogDto[]> {
    const { data } = await apiClient.get<AttendanceLogDto[]>(
      "/api/v1/exitlog/get/my-logs"
    );
    return data;
  },

  async getMyStudents(): Promise<MyStudentDto[]> {
    const { data } = await apiClient.get<MyStudentDto[]>(
      "/api/v1/student/get/my-students"
    );
    return data;
  },

  async checkCongestion(studentId: number): Promise<CongestionDto> {
    const { data } = await apiClient.get<CongestionDto>(
      `/api/v1/parent/congestion/overview/student/${Number(studentId)}`
    );
    return data;
  },
};
