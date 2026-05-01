"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { cn } from "@/lib/utils";
import location from "@/location.json";
import { ProductSuggestion } from "@/types/users";
import { useDebounce } from "@/utils/debounce";
import { useProductSuggestions } from "@/utils/query-products";
import Link from "next/link";

export default function SearchInput() {
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [search, setSearch] = useState("");

  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced search
  const debouncedSearch = useDebounce(search, 300);

  // Query product suggestions
  const { data: suggestions = [] } = useProductSuggestions(
    debouncedSearch,
    state,
    city
  );
 
  // Derived cities from state
  const states = location.map((d) => d.state);
  const cities =
    location.find((d) => d.state.toLowerCase() === state.toLowerCase())
      ?.major_cities || [];

  // Close dropdown on outside click
  // useEffect(() => {
  //   const handler = (e: MouseEvent) => {
  //     if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
  //       setShowDropdown(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handler);
  //   return () => document.removeEventListener("mousedown", handler);
  // }, []);



  

  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-amber-600 rounded-2xl blur-xl opacity-20" />

        <div className="bg-white shadow-xl border border-gray-100 rounded-2xl p-4">
          <div className="grid grid-cols-11 gap-4 items-center">
            {/* Search Input */}
            <div
              ref={containerRef}
              className="col-span-10 md:col-span-5 relative flex items-center gap-3 bg-emerald-50 rounded-xl px-4 py-2"
            >
              <Search className="w-5 h-5 text-gray-400" />

              <Input
                type="text"
                placeholder="Search for products, items, or vendors..."
                className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-base z-10"
                value={search}
                onFocus={() => suggestions.length && setShowDropdown(true)}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowDropdown(true);
                }}
              />

             
            </div>

            {/* State */}
            <div className="col-span-6 md:col-span-2 z-10">
              <Select onValueChange={setState}>
                <SelectTrigger className="w-full rounded-xl">
                  <SelectValue
                    placeholder={
                      <span className="flex items-center gap-2">
                        <MapPin className="text-emerald-600 w-4 h-4" />
                        Nigeria
                      </span>
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {states.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* City */}
            <div className="col-span-6 md:col-span-2 z-10">
              <Select
                onValueChange={setCity}
                disabled={!state}
              >
                <SelectTrigger className="w-full rounded-xl">
                  <SelectValue placeholder={state || "City"} />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <div className="col-span-12 md:col-span-1">
              <Button
                size="lg"
                className="w-full md:w-auto rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 px-8"
             
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

       {showDropdown && search && suggestions?.length > 0 ? (
              <div className="border-t border-emerald-200 bg-linear-to-r from-emerald-50 to-amber-50 max-h-64 overflow-y-auto">
                <div className="p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Popular in {search}
                  </p>
                  <div className="space-y-2">
                    {suggestions?.slice(0,10).map(
                      (suggestion: ProductSuggestion) => {
                    
                    return(
                        <Link
                          href={`/categories/${suggestion.subcategorySlug}?q=${suggestion.name}`}
                          
                          key={suggestion.id}
                         
                          className="w-full text-left px-3 py-2.5 rounded-lg bg-white hover:bg-amber-50 transition-colors flex gap-2 items-center justify-between group"
                        >
                          <span className="text-sm text-gray-700  group-hover:text-emerald-600">
                            {suggestion.name} in 
                            <span className="text-emerald-700 ml-2">{suggestion.subcategoryName}</span>
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-600 transition-colors" />
                         
                          </Link>
                      )
                      }  )}
                  </div>
                </div>
              </div>
            ) : (
              showDropdown && search && suggestions?.length === 0 && (
                  <div className="border-t border-gray-100 bg-gray-50 max-h-64 overflow-y-auto">
                    <div className="p-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        No suggestions found
                      </p>
                    </div>
                  </div>
                )
            )}

      {/* Popular terms */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-sm text-gray-600">
        <span>Popular:</span>
        {["Electronics", "Fashion", "Home Decor", "Beauty", "Sports"].map(
          (term) => (
            <button
              key={term}
              className="px-4 py-2 bg-white rounded-full hover:bg-emerald-50 hover:text-emerald-700 transition-all shadow-sm border border-gray-100"
              onClick={() => setSearch(term)}
            >
              {term}
            </button>
          )
        )}
      </div>
    </div>
  );
}
