"use client";

import { useQuery } from "@tanstack/react-query";
import apiPublic from "./api-public";

export const useProductSuggestions = (
  search: string = "",
  state: string = "",
  city: string = ""
) => {
  return useQuery({
    queryKey: ["product-suggestions", search, state, city], 
    queryFn: async () => {
      if (!search.trim()) return [];

      const res = await apiPublic.get(
        `/product/all?search=${encodeURIComponent(search)}&state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}&suggestions=true`
      );

      return res.data.data; // array of suggestions
    },
    enabled: !!search.trim(),
    staleTime: 1000 * 60 * 5,
  });
};


export const useQueryProducts = (
  slug: string,
  search = "",
  page = 1,
  limit = 10,
  state = "",
  city = ""
) =>
  useQuery({
    queryKey: ["subcategory-products", slug, search, page, limit, state, city],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        state,
        city,
      });

      if (search.trim()) {
        params.append("search", search);
      }

      const res = await apiPublic.get(`/product/subcategory/${slug}?${params}`);
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

export const useProductWithSuggestions = (slug: string, search = "", state = "", city = "") =>
  useQuery({
    queryKey: ["product-suggestions", slug, search, state, city],
    enabled: !!search.trim(),
    queryFn: async () => {
      const res = await apiPublic.get(
        `/product/subcategory/${slug}?search=${encodeURIComponent(search)}&state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}&suggestions=true`
      );
      return res.data.data;
    },
  });


