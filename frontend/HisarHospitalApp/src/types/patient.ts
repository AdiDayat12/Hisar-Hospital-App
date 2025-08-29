// // tipe yang digunakan di UI
// export interface Patient {
//   id: number;
//   name: string;
//   email: string;
//   identityNumber: string;
//   birthDate: string;
//   phone: string;
//   address: string;
// }

// // tipe yang sesuai respons backend
// export interface PatientResponse {
//   id: number;
//   firstName: string;
//   lastName: string;
//   identityNumber: string;
//   email: string;
//   birthDate: string;
//   phone: string;
//   address: string;
// }
// src/types/patient.ts

import { UserResponse } from "./user";

export interface PatientResponse extends UserResponse {
  birthDate: string; // LocalDate from backend typically maps to a string in "YYYY-MM-DD" format
  address?: string; // Optional
}
