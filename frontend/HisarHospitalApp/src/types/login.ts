// tipe yang digunakan di UI
export interface LoginResponse {
  token: string;
  email: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
