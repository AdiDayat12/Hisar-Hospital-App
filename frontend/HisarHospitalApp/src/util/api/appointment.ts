import axios from "axios";
import API_URL from "../../../src/config";

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface AppointmentRequest {
  doctorId: number | null;
  specialization?: string;
  appointmentDate: string; // format: "2025-08-23"
  appointmentTime: string; // format: "14:30:00"
}

export interface AppointmentResponse {
  id: number;
  doctorId: number;
  doctorName: string;
  specialization: string;
  patientName: string;
  appointmentDate: string; // "2025-08-23" format yyyy-MM-dd
  appointmentTime: string; // "14:30:00" format HH:mm:ss
  status: string;
  notes: string;
}

export async function bookAppointment(
  request: AppointmentRequest
): Promise<ApiResponse<AppointmentResponse>> {
  const response = await axios.post<ApiResponse<AppointmentResponse>>(
    `${API_URL}/appointments`,
    request
  );

  return response.data;
}

export async function getAllAppointments(): Promise<
  ApiResponse<AppointmentResponse[]>
> {
  const response = await axios.get<ApiResponse<AppointmentResponse[]>>(
    `${API_URL}/appointments/patient/me`
  );
  return response.data;
}

interface JwtPayload {
  sub: string;
  role: string;
  // tambahkan field lain jika ada
}

export async function getAllAppointmentsByDoctor(
  date?: string
): Promise<ApiResponse<AppointmentResponse[]>> {
  try {
    const response = await axios.get<ApiResponse<AppointmentResponse[]>>(
      `${API_URL}/appointments/doctor/me`,
      {
        params: date ? { date } : {}, // kirim query param hanya jika ada
      }
    );

    return response.data;
  } catch (err: any) {
    console.error("Error fetching doctor appointments:", err);
    throw err;
  }
}

export async function getAppointmentById(
  id: number
): Promise<ApiResponse<AppointmentResponse>> {
  const response = await axios.get<ApiResponse<AppointmentResponse>>(
    `${API_URL}/appointments/${id}`
  );
  return response.data;
}

export async function cancelAppointment(
  id: number
): Promise<ApiResponse<null>> {
  try {
    const response = await axios.put<ApiResponse<null>>(
      `${API_URL}/appointments/${id}/cancel`
    );
    // Return the full response.data object, which is of type ApiResponse<null>
    return response.data;
  } catch (error) {
    // Check if the error is an AxiosError with a response from the server
    if (axios.isAxiosError(error) && error.response) {
      // Return the API's error response
      return error.response.data;
    }
    // Handle other types of errors (e.g., network issues)
    throw new Error(
      "Failed to cancel appointment due to a network or server error."
    );
  }
}
