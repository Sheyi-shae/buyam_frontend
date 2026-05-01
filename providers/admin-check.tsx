"use client";

import { useCurrentUser } from "@/utils/current-user-hook";
import { useBackendLogout } from "@/utils/logout";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface AuthProviderProps {
  children: ReactNode;
  protection?: boolean;
}

export function AdminCheckProvider({ children}: AuthProviderProps) {
  const { data: user, isLoading, error } = useCurrentUser();
  const logout = useBackendLogout();
  const router = useRouter();


  useEffect(() => {
      if (isLoading) return;
      
    if (user?.role != "ADMIN") {
      
      router.replace(
        `/`
      );
    }
  }, [ user, isLoading, router]);

 

 
  return <>{children}</>;
}
