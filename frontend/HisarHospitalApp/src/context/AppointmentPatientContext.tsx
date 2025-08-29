import {
  AppointmentResponse,
  getAllAppointments,
} from "@/src/util/api/appointment";
import React, { createContext, useContext, useEffect, useState } from "react";

type AppointmentContextType = {
  appointments: AppointmentResponse[];
  setAppointments: React.Dispatch<React.SetStateAction<AppointmentResponse[]>>;
  loading: boolean;
  refreshAppointments: () => Promise<void>;
};

const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined
);

export const AppointmentPatientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshAppointments = async () => {
    setLoading(true);
    try {
      const response = await getAllAppointments();
      if (response.data) {
        setAppointments(response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAppointments();
  }, []);

  return (
    <AppointmentContext.Provider
      value={{ appointments, setAppointments, loading, refreshAppointments }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentPatientContext = () => {
  const ctx = useContext(AppointmentContext);
  if (!ctx)
    throw new Error(
      "useAppointmentContext must be used within AppointmentProvider"
    );
  return ctx;
};
