// src/context/UserContext.tsx

import { jwtDecode } from "jwt-decode";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import * as SecureStore from "expo-secure-store";

import { AdminResponse } from "../types/admin";
import { DoctorResponse } from "../types/doctor";
import { Role } from "../types/enums";
import { PatientResponse } from "../types/patient";
import { ResetPasswordRequest } from "../types/user";
import { getAdmin } from "../util/api/admin";
import {
  resetPassword as resetPasswordApi,
  sendOtp as sendOtpApi,
} from "../util/api/auth";
import { getDoctor } from "../util/api/doctor";
import { getPatient } from "../util/api/patient";

// -------------------------
// Tipe generik user & role
// -------------------------

// Define the generic User type
export type User = PatientResponse | DoctorResponse | AdminResponse;

interface UserContextType {
  user: User | null;
  role: Role | null;
  loading: boolean;
  error: string | null;
  reloadUser: () => Promise<Role | null>; // Modified to return the role
  logout: () => Promise<void>;
  sendOtp: (email: string) => Promise<void>;
  resetPassword: (req: ResetPasswordRequest) => Promise<void>;
}

// -------------------------
// Create context
// -------------------------
const UserContext = createContext<UserContextType | undefined>(undefined);

// -------------------------
// Provider
// -------------------------
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const reloadUser = useCallback(async () => {
    setLoading(true);
    let decodedRole: Role | null = null;
    try {
      const token = await SecureStore.getItemAsync("jwt");
      if (!token) {
        throw new Error("No JWT token found");
      }

      const decoded: { role: Role; sub: string } = jwtDecode(token);
      decodedRole = decoded.role;
      setRole(decoded.role);

      let data: User;
      if (decoded.role === "ROLE_PATIENT") {
        data = await getPatient();
        console.log("Fetched patient data successfully.");
      } else if (decoded.role === "ROLE_DOCTOR") {
        data = await getDoctor();
        console.log("Fetched doctor data successfully.");
      } else if (decoded.role === "ROLE_ADMIN") {
        data = await getAdmin();
        console.log("Fetched admin data successfully.");
      } else {
        throw new Error("Unknown role");
      }

      setUser(data);
      setError(null);
    } catch (err: any) {
      // This will now log the specific error from the `try` block
      console.error("Error inside reloadUser:", err.message);
      setError(err.message || "Failed to load user");
      setUser(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
    return decodedRole;
  }, []);

  const logout = useCallback(async () => {
    try {
      await SecureStore.deleteItemAsync("jwt"); // hapus token
      setUser(null);
      setRole(null);
      setError(null);
    } catch (err: any) {
      console.error("Logout failed:", err.message);
    }
  }, []);

  const sendOtp = useCallback(async (email: string) => {
    try {
      await sendOtpApi(email);
    } catch (err: any) {
      console.error("Send otp failed:", err.message);
    }
  }, []);

  const resetPassword = useCallback(async (req: ResetPasswordRequest) => {
    try {
      await resetPasswordApi(req);
      console.log("reset password success");
    } catch (err: any) {
      console.error("Reset password failed:", err.message);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        role,
        loading,
        error,
        reloadUser,
        logout,
        sendOtp,
        resetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// -------------------------
// Custom hook
// -------------------------
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within UserProvider");
  return context;
};
