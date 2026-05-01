"use client";

import { useQueryClient } from "@tanstack/react-query";
import apiPrivate from "./api-private";
import { useAuthStore } from "@/stores/auth-stores";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useBackendLogout = () => {
  const { setUser, logout: logoutFromStore } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter(); 


  const logout = async () => {
    try {
     
    
      setUser(null);
      logoutFromStore();

      await apiPrivate.post("/auth/logout");

      queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      toast.success("Logged out successfully");

      localStorage.setItem("logout", Date.now().toString());

      router.replace(
        `/signin&signup-auth`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
};
