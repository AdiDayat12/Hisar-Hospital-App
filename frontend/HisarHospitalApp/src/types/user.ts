// src/types/user.ts

import { Status, UserRole } from "./enums";

export interface UserResponse {
  id: number;
  identityNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string; // It's a good practice to make it optional if it can be null
  role: UserRole;
  status: Status;
  createdAt: string; // Timestamp from backend typically maps to a string in ISO format
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}
