import { useEffect, useState } from "react";
import { Patient } from "../../src/types/patient";
import { getPatient } from "../util/api"; // misal

export function usePatient() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPatient() {
      try {
        const data = await getPatient();
        const mapped: Patient = {
          id: data.id,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          idNumber: data.idNumber,
          birthDate: data.birthDate,
          phone: data.phone,
          address: data.address,
        };
        setPatient(mapped);
      } catch (err) {
        setError("Gagal mengambil data patient");
      } finally {
        setLoading(false);
      }
    }

    loadPatient();
  }, []);

  return { patient, loading, error };
}
