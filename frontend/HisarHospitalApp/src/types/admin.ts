// src/types/admin.ts

import { UserResponse } from "./user";

export interface AdminResponse extends UserResponse {
  department: string;
  phoneExtension?: string; // Optional
}
