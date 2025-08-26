// src/context/PatientContext.tsx

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Patient } from "../types/patient";
import { getPatient } from "../util/api/patient";

// 1. Definisikan tipe untuk konteks
interface PatientContextType {
  patient: Patient | null;
  loading: boolean;
  error: string | null;
  reloadPatient: () => Promise<void>;
}

// 2. Buat Konteks dengan tipe yang telah didefinisikan
const PatientContext = createContext<PatientContextType | undefined>(undefined);

// 3. Buat Provider Component dengan children prop
interface PatientProviderProps {
  children: ReactNode;
}

export const PatientProvider = ({ children }: PatientProviderProps) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 2. Wrap reloadPatient with useCallback
  const reloadPatient = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPatient();
      const mapped: Patient = {
        id: data.id,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        identityNumber: data.identityNumber,
        birthDate: data.birthDate,
        phone: data.phone,
        address: data.address,
      };
      setPatient(mapped);
      setError(null);
    } catch (err) {
      setError("Gagal mengambil data patient");
    } finally {
      setLoading(false);
    }
  }, []); // <-- Empty dependency array means this function is only created once

  // 3. Now safely use reloadPatient in useEffect
  useEffect(() => {
    reloadPatient();
    // ✅ The linter is happy because reloadPatient is now a stable dependency
  }, [reloadPatient]);

  return (
    <PatientContext.Provider value={{ patient, loading, error, reloadPatient }}>
      {children}
    </PatientContext.Provider>
  );
};

// 4. Buat Custom Hook untuk akses mudah
export const usePatientContext = () => {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error("usePatientContext must be used within a PatientProvider");
  }
  return context;
};
