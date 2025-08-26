import { Doctor } from "@/src/types/doctor";
import { useEffect, useState } from "react";
import { PageableResponse, getDoctors } from "../util/api/doctor";

export function useDoctors(initialPage = 0, pageSize = 10) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getDoctors(page, pageSize)
      .then((data: PageableResponse<Doctor>) => {
        // PERBAIKAN: Gunakan functional update untuk menambahkan data baru
        setDoctors((prevDoctors) => {
          const newDoctors = data.content.filter(
            (doc) => !prevDoctors.some((d) => d.id === doc.id)
          );
          return [...prevDoctors, ...newDoctors];
        });
        setTotalPages(data.totalPages);
      })
      .catch((err) => setError("Failed to load doctors"))
      .finally(() => setLoading(false));
  }, [page]);

  return { doctors, page, totalPages, setPage, loading, error };
}
