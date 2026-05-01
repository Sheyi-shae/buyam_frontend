"use client"

import apiPrivate from "@/utils/api-private"
import { useQuery } from "@tanstack/react-query"
import apiPublic from "./api-public"

interface QueryDataProps {
  queryKey: string
  queryParams?:string | number | undefined
  requestUrl: string
}

export function useFetchPrivateData<T = unknown>({
  queryKey,
  requestUrl,
  queryParams
}: QueryDataProps) {
 
 
  return useQuery<T>({
    queryKey: [queryKey,queryParams], 
    queryFn: async () => {
      const res = await apiPrivate.get(requestUrl)
      return res.data.data as T
    },
    
    retry: false,
    
  })
}

export function useFetchPublicData<T = unknown>({
  queryKey,
  requestUrl,
  queryParams
}: QueryDataProps) {
 
 
  return useQuery<T>({
    queryKey: [queryKey,queryParams],
    queryFn: async () => {
      const res = await apiPublic.get(requestUrl)
      return res.data.data as T
    },
    retry: false,
    
  })
}