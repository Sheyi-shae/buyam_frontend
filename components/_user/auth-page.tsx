"use client"


import { AuthClient } from "@/components/auth/auth-client"
import { PageLoader } from "@/components/loading-spinners";
import { useAuthStore } from "@/stores/auth-stores";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthPage() {
   const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/";
  const reason = searchParams.get("reason") || "";
  const router= useRouter()

  const {user}= useAuthStore()
const messages: Record<string, string> = {
  AUTH_REQUIRED: "Please sign in to access this page",
};
  const msg = reason ? messages[reason] : ""; 
  

 
  
  useEffect(() => {
    if (user) {
      router.replace(returnTo);
      
    }
  }, [user, router, returnTo]);

   if (user) {
    return <PageLoader />
  }

  return (
    <div className="">
      <AuthClient redirectTo={ returnTo} msg={msg} />
    </div>
  )
}
