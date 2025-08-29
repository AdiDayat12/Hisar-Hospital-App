import { ResetPasswordRequest } from "@/src/types/user";
import axios from "axios";
import API_URL from "../../../src/config";
import { LoginRequest } from "../../../src/types/login";

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface UpdateProfileRequest {
  identityNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  address: string;
}
export interface SignUpRequest {
  identityNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  status: number;
  message: string;
  data: null;
}

export async function login(request: LoginRequest): Promise<string> {
  const response = await axios.post<ApiResponse<string>>(
    `${API_URL}/login`,
    request,
    { withCredentials: true } // supaya cookie httpOnly bisa diterima
  );
  return response.data.data!; // ini jwtToken
}

export async function signup(request: SignUpRequest): Promise<SignupResponse> {
  const response = await axios.post<SignupResponse>(
    `${API_URL}/patients/register`,
    request
  );

  return response.data;
}

export async function sendOtp(email: string): Promise<void> {
  const response = await axios.post<void>(`${API_URL}/send-reset-otp`, null, {
    params: { email },
  });
  return response.data;
}

export async function resetPassword(request: ResetPasswordRequest) {
  const { data } = await axios.post<void>(`${API_URL}/reset-password`, request);
  return data;
}
