import axios from "axios";
import API_URL from "../../../src/config";
import { PatientResponse } from "../../../src/types/patient";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface SignUpRequest {
  identityNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupResponse {
  status: number;
  message: string;
  data: null;
}

export interface UpdateProfileRequest {
  identityNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthdate: string;
  address: string;
}

export async function signup(request: SignUpRequest): Promise<SignupResponse> {
  const response = await axios.post<SignupResponse>(
    `${API_URL}/patients/register`,
    request
  );

  return response.data;
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

export async function updatePatientProfile(
  request: UpdateProfileRequest
): Promise<PatientResponse> {
  const response = await axios.put<ApiResponse<PatientResponse>>(
    `${API_URL}/patients/me`,
    request,
    { withCredentials: true } // pastikan cookie dikirim
  );

  return response.data.data;
}
