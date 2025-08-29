import {
  AppointmentResponse,
  getAllAppointmentsByDoctor,
} from "@/src/util/api/appointment";
import React, { createContext, useContext, useEffect, useState } from "react";

type AppointmentContextType = {
  appointments: AppointmentResponse[];
  loading: boolean;
  refreshAppointments: (date?: string) => Promise<void>;
};

const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined
);

export const AppointmentDoctorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshAppointments = async (date?: string) => {
    setLoading(true);
    try {
      // jika date tidak dikirim, ambil tanggal hari ini
      const today = date || new Date().toISOString().split("T")[0];

      const response = await getAllAppointmentsByDoctor(today);
      if (response.data) {
        setAppointments(response.data);
      } else {
        setAppointments([]);
      }
    } catch (err) {
      console.error("Error fetching doctor appointments:", err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  // fetch default hari ini
  useEffect(() => {
    refreshAppointments();
  }, []);

  return (
    <AppointmentContext.Provider
      value={{ appointments, loading, refreshAppointments }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentDoctorContext = () => {
  const ctx = useContext(AppointmentContext);
  if (!ctx)
    throw new Error(
      "useAppointmentDoctorContext must be used within AppointmentDoctorProvider"
    );
  return ctx;
};
