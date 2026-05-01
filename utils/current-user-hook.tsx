import { useAuthStore } from "@/stores/auth-stores";
import { User } from "@/types/users";
import { useQuery } from "@tanstack/react-query";
import apiPrivate from "./api-private";
import { AxiosError } from "axios";
import { useEffect } from "react";

export function useCurrentUser() {
  const { setUser } = useAuthStore();

  const query = useQuery<User, AxiosError>({
    queryKey: ["currentUser"],
    queryFn: async (): Promise<User> => {
      const res = await apiPrivate.get<{ ok: boolean; data: User }>("/auth/me");

      if (!res.data.ok || !res.data.data) {
        throw new Error("Invalid authentication response");
      }
      
      return res.data.data;
    },
    retry: (failureCount, error: AxiosError) => {
      return (
        failureCount < 1 &&
        error.response?.status !== 401 &&
        error.response?.status !== 403
      );
    },
    //staleTime: 5 * 60 * 1000,
  });

  // Sync only when user is present — NO logout triggers
  useEffect(() => {
    if (query.data) {
      console.log("user data",query.data)
      setUser(query.data);
    }
  }, [query.data, setUser]);

  return query;
}
