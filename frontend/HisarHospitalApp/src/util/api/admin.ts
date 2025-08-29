import { AdminResponse } from "@/src/types/admin";
import axios from "axios";
import API_URL from "../../config";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function getAdmin(): Promise<AdminResponse> {
  const response = await axios.get<ApiResponse<AdminResponse>>(
    `${API_URL}/admins/me`
  );
  return response.data.data;
}
