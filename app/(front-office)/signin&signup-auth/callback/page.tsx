"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-stores";
import apiPrivate from "@/utils/api-private";
import { toast } from "sonner";
import { PageLoader } from "@/components/loading-spinners";

export default function AuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser } = useAuthStore();

  const returnTo = searchParams.get("redirectTo") || "/";
  
  useEffect(() => {
    let mounted = true;

    apiPrivate
      .get("/auth/me")
      .then((res) => {
        if (!mounted) return;

        setUser(res.data.data);
        toast.success("Logged in successfully");

        router.replace(returnTo); // GO TO INTENDED PAGE
      })
      .catch((err) => {
        console.error("Auth callback error:", err);

        router.replace(`/signin&signup-auth?returnTo=${encodeURIComponent(returnTo)}`);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <PageLoader/>
  );
}
