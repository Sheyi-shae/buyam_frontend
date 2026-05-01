"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import location from "@/location.json";
import { useSearchStore } from "@/stores/search-store";
import { Product } from "@/types/users";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";


interface SearchBarProps{
  searchQuery: string
  setSearchQuery:(val: string) => void
  selectedState:string
  setSelectedState: (val: string) => void
  selectedCity:string
  setSelectedCity: (val: string) => void
  handleSearch: () => void
  suggestionData: Product[] 
  loading?: boolean;
  setSubmittedQuery: (val:string)=>void
}


export default function SearchBar(
  { searchQuery,
    selectedCity,
    selectedState,
    setSearchQuery,
    setSelectedCity,
    setSelectedState,
    handleSearch,
    suggestionData,
    setSubmittedQuery
    
  
  }:SearchBarProps) {
  
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { clearSearches, search } = useSearchStore()

  const availableCities =
    location.find(
      (d) => d.state.toLowerCase() === selectedState.toLowerCase()
    )?.major_cities || [];

  const states = location.map((d) => d.state);
  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  

  const handleCategoryClick = (category: string) => {
    setSearchQuery(category);
    setSubmittedQuery(category);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSubmittedQuery("");

  };

  return (
    <div className="w-full pt-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden mb-12">
        {/* Background with gradient */}
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

        <div className="relative z-10 max-w-6xl mx-auto  sm:px-6 lg:px-8 py-12">
          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-4xl sm:text-5xl cat-heading mb-3 tracking-tight">
              Discover What You&apos;re Looking For
            </h1>
            <p className="text-base font-light sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Search across thousands of products, vendors, and services in your
              area
            </p>
          </div>

          {/* Main Search Container */}
          <div
            ref={containerRef}
            className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            {/* Search Input Section */}
            <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Search Input */}
              
                <div className="relative  mt-7 flex items-center sm:col-span-2">
                  <Search className="absolute left-4 w-5 h-5 text-emerald-600 pointer-events-none" />
                  <Input
                    type="text"
                    placeholder="Search products, vendors, items..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    className="pl-12 pr-12 py-3 text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        clearSearch();
                       
                      }}
                      className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
           

              {/* Filters Grid */}
            
                {/* State Select */}
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger className="w-full rounded-lg border-2 border-gray-200 focus:border-emerald-500 h-11">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* City Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <Select
                    value={selectedCity}
                    onValueChange={setSelectedCity}
                    disabled={!selectedState}
                  >
                    <SelectTrigger
                      className={`w-full rounded-lg border-2 h-11 ${
                        selectedState
                          ? "border-gray-200 focus:border-emerald-500"
                          : "border-gray-100 bg-gray-50"
                      }`}
                    >
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                <div className="flex col-span-2 lg:col-span-1 items-end">
                  <Button
                    onClick={handleSearch}
                    className="w-full h-11 bg-linear-to-r from-emerald-600 to-teal-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </Button>
                </div>
              </div>

           {/* Quick Filters */}
              <div className="p-6 flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-600 flex items-center">
                 Recent Searches:
                </span>
                {search?.slice(0, 5).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => handleCategoryClick(filter)}
                    className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-emerald-100 text-gray-700 hover:text-emerald-700 rounded-full transition-colors font-medium"
                  >
                    {filter}
                  </button>
                ))}
              <X className="cursor-pointer mt-1 w-4 h-4 text-slate-500 " onClick={() => {
                clearSearches();
               
              }}/>
              </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && searchQuery && suggestionData?.length > 0 ? (
              <div className="border-t border-gray-100 bg-gray-50 max-h-64 overflow-y-auto">
                <div className="p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Popular in {searchQuery}
                  </p>
                  <div className="space-y-2">
                    {suggestionData?.map(
                      (suggestion) => (
                        <button
                          key={suggestion.id}
                          onClick={() => {
                            setSearchQuery(
                              ` ${suggestion.name.toLowerCase()}`
                            );
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white transition-colors flex items-center justify-between group"
                        >
                          <span className="text-sm text-gray-700 group-hover:text-emerald-600">
                            {suggestion.name}
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-600 transition-colors" />
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              showSuggestions && searchQuery && suggestionData?.length === 0 && (
                  <div className="border-t border-gray-100 bg-gray-50 max-h-64 overflow-y-auto">
                    <div className="p-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        No suggestions found
                      </p>
                    </div>
                  </div>
                )
            )}
          </div>

        </div>
      </div>

     
    </div>
  );
}
