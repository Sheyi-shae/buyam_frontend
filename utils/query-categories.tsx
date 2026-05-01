import { useQuery } from "@tanstack/react-query";
import apiPrivate from "@/utils/api-private";

export const useCategories = (search = "", page = 1, limit = 3) => {
  return useQuery({
    queryKey: ["categories", search, page, limit],
    queryFn: async () => {
      const res = await apiPrivate.get(
        `/category/all?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    //keepPreviousData: true, // for smoother pagination
  });
};


export const useCategorySuggestions = (search = "") => {
  return useQuery({
    queryKey: ["category-suggestions", search],
    queryFn: async () => {
      if (!search) return [];
      const res = await apiPrivate.get(
        `/category/all?search=${encodeURIComponent(search)}&suggestions=true`
      );
      
      console.log("search suggestions", res.data.data); 
      return res.data.data; // array of names
    },
    enabled: !!search, // only fetch if search string exists
    staleTime: 1000 * 60 * 5, // optional caching
  });
  //return data;
};