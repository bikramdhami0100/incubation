import { getCookie } from "@/app/fwucontext/CustomCookies";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, ReactNode, useContext } from "react";

// Define the admin data structure
interface AdminData {
  id: string | number;
  name: string;
  email: string;
  role: string;
  profile_image?: string;
  email_verified: number;
  created_at: string;
  updated_at?: string;
}

// Define the API response structure
interface ProfileResponse {
  admin: AdminData[];
  message?: string;
  success?: boolean;
}

// Define the context value type
interface AdminContextValue {
  isLoading: boolean;
  isError: boolean;
  adminData: ProfileResponse | undefined;
  refetch: () => void;
}

// Define the provider props
interface AdminContextProviderProps {
  children: ReactNode;
}

export const AdminContext = createContext<AdminContextValue | null>(null);

function AdminContextProvider({ children }: AdminContextProviderProps) {
  const token = getCookie("token");

  const handlerAdmin = async (): Promise<ProfileResponse> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    
    return response.data;
  };

  const { isLoading, isError, data: adminData, refetch } = useQuery<ProfileResponse>({
    queryKey: ["profile"],
    queryFn: handlerAdmin,
    enabled: !!token, // Only run query if token exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  const contextValue: AdminContextValue = {
    isLoading,
    isError,
    adminData,
    refetch
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
}

export default AdminContextProvider;

// Optional: Custom hook for using the context
export const useAdminContext = (): AdminContextValue => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminContextProvider');
  }
  return context;
};