"use client";

import { useAuthStore } from "@/stores/auth-stores";
import { useCurrentUser } from "@/utils/current-user-hook";
import { useAppSocket } from "./socket-provider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { PageLoader } from "@/components/loading-spinners";

interface AuthProviderProps {
  children: ReactNode;
  protection?: boolean;
  msg?: string; 
}

export function AuthProvider({ children, protection, msg = '' }: AuthProviderProps) {
  const { data: user, isLoading, error } = useCurrentUser();
  const { socket, isConnected } = useAppSocket();
  const { setUser } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fullPath = searchParams.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  // Sync user state with Zustand store (regardless of protection)
  useEffect(() => {
    if (isLoading) return;
    
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  }, [user, isLoading, setUser]);

  

  // Handle protected route redirects
  useEffect(() => {
    if (!protection) return;
    if (isLoading) return;

    if (!user || error) {
      router.replace(
        `/signin&signup-auth?returnTo=${encodeURIComponent(fullPath)}&reason=AUTH_REQUIRED`
      );
    }
  }, [protection, isLoading, user, error, router, fullPath, msg]);

  
  useEffect(() => {
    if (!user?.id) return;
    if (!isConnected) return;

    // Join user room once socket is connected
    socket?.emit("join", user.id);
  }, [user?.id, isConnected   ,socket]);

console.log(user?.online)
  // Loading state
  if (protection && isLoading) {
    return (
      <PageLoader/>
    );
  }

  // Prevent flashing children before redirect
  if (protection && !user) {
    return null;
  }

  return <>{children}</>;
}