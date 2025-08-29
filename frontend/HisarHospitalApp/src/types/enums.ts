// src/types/enums.ts

export enum UserRole {
  PATIENT = "ROLE_PATIENT",
  DOCTOR = "ROLE_DOCTOR",
  ADMIN = "ROLE_ADMIN",
}

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
  // Tambahkan status lain jika ada di backend Anda
}

export type Role = "ROLE_PATIENT" | "ROLE_DOCTOR" | "ROLE_ADMIN";
