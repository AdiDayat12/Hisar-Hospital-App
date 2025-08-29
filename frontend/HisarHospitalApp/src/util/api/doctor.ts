import { DoctorResponse } from "@/src/types/doctor";
import axios from "axios";
import API_URL from "../../../src/config"; //

interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  qualification: string;
  specialization: string;
  bio: string;
  practiceLocation: string;
  photoUrl: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Struktur response backend untuk pageable
export interface PageableResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // current page
  size: number; // page size
}

// Fungsi untuk fetch daftar dokter dengan pagination
export async function getDoctors(
  page: number = 0,
  size: number = 10
): Promise<PageableResponse<Doctor>> {
  try {
    const response = await axios.get<ApiResponse<PageableResponse<Doctor>>>(
      `${API_URL}/doctors?page=${page}&size=${size}`
    );

    // Ambil data dari ApiResponse
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    throw error;
  }
}

// Optional: fungsi fetch dokter detail by ID
export async function getDoctorById(id: number | null): Promise<Doctor> {
  try {
    const response = await axios.get<ApiResponse<Doctor>>(
      `${API_URL}/doctors/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error(`Failed to fetch doctor with id ${id}:`, error);
    throw error;
  }
}

export async function getDoctor(): Promise<DoctorResponse> {
  const response = await axios.get<ApiResponse<DoctorResponse>>(
    `${API_URL}/doctors/me`
  );
  return response.data.data;
}
