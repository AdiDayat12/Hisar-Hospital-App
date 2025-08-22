import axios from "axios";
import API_URL from "../../src/config";
import { PatientResponse } from "../../src/types/patient";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export async function login(request: LoginRequest): Promise<string> {
  const response = await axios.post<ApiResponse<string>>(
    `${API_URL}/login`,
    request,
    { withCredentials: true } // supaya cookie httpOnly bisa diterima
  );
  return response.data.data!; // ini jwtToken
}

export async function getPatient(): Promise<PatientResponse> {
  const response = await axios.get<ApiResponse<PatientResponse>>(
    `${API_URL}/patients/me`
  );
  return response.data.data;
}
