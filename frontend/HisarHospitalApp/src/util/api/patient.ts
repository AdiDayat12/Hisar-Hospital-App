import axios from "axios";
import API_URL from "../../../src/config";
import { PatientResponse } from "../../../src/types/patient";

interface ApiResponse<T> {
  success: boolean;
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
