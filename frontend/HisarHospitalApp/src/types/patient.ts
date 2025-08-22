// tipe yang digunakan di UI
export interface Patient {
  id: number;
  name: string;
  email: string;
  idNumber: string;
  birthDate: string;
  phone: string;
  address: string;
}

// tipe yang sesuai respons backend
export interface PatientResponse {
  id: number;
  firstName: string;
  lastName: string;
  identityNumber: string;
  email: string;
  idNumber: string;
  birthDate: string;
  phone: string;
  address: string;
}
