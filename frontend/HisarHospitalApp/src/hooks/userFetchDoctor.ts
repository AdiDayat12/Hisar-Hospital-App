import { Doctor } from "@/src/types/doctor";
import { useEffect, useState } from "react";
import { getDoctorById } from "../util/api/doctor";

export function useDoctor(id: number | null) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    if (id === null) {
      setDoctor(null);
      setLoading(false);
      setError(null);
      return;
    }
    async function loadDoctor() {
      try {
        const data = await getDoctorById(id);
        setDoctor(data);
      } catch (error) {
        setError("Gagal mengambil doctor");
      } finally {
        setLoading(false);
      }
    }
    loadDoctor();
  }, [id]);
  return { doctor, loading, error };
}
