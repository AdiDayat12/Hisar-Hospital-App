export interface Doctor {
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

// src/types/doctor.ts

import { UserResponse } from "./user";

export interface DoctorResponse extends UserResponse {
  qualification: string;
  specialization: string;
  bio?: string; // Optional
  practiceLocation?: string; // Optional
  photoUrl?: string; // Optional
}
