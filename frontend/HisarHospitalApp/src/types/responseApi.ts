export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// src/types/user.ts

export type Role = "patient" | "doctor" | "admin";

export interface PatientResponse {
  id: number;
  firstName: string;
  lastName: string;
  identityNumber: string;
  email: string;
  birthDate: string;
  phone: string;
  address: string;
  role: "patient"; // Discriminant property
}

export interface DoctorResponse {
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
  role: "doctor"; // Discriminant property
}

export interface AdminResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  // other admin-specific properties
  role: "admin"; // Discriminant property
}

export type UserResponse = PatientResponse | DoctorResponse | AdminResponse;
