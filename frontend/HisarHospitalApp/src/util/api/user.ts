// src/util/api/user.ts

import axios from "axios";
import API_URL from "../../../src/config";
import {
  AdminResponse,
  ApiResponse,
  DoctorResponse,
  PatientResponse,
} from "../../types/responseApi";

// Type map to link the role string to its corresponding type
type RoleToUserResponse<R extends "patient" | "doctor" | "admin"> =
  R extends "patient"
    ? PatientResponse
    : R extends "doctor"
    ? DoctorResponse
    : R extends "admin"
    ? AdminResponse
    : never; // The 'never' type ensures an error if an invalid role is used

// The function is now generic, accepting a type parameter T that extends the allowed roles.
export async function getUser<T extends "patient" | "doctor" | "admin">(
  role: T
): Promise<RoleToUserResponse<T>> {
  // Use a string literal for the endpoint to avoid potential type issues
  const endpoint =
    role === "patient" ? "patients" : role === "doctor" ? "doctors" : "admins";

  // Use 'any' here since the actual type is handled by the function's return type
  const response = await axios.get<ApiResponse<any>>(
    `${API_URL}/${endpoint}/me`
  );

  // Return the data, casting it to the specific type inferred by TypeScript
  return response.data.data as RoleToUserResponse<T>;
}
