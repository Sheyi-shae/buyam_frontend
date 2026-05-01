"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryType } from "@/types/users";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  handleRefresh: () => void;
  searchQuery?:string
  suggestions?: CategoryType[];
  loading?: boolean;
}

export const SearchBar = React.memo(function SearchBar({
  value,
  onChange,
  onSubmit,
  suggestions = [],
  loading,
  handleRefresh
}: SearchBarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);


  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
      setShowDropdown(false);
    }
  };

  return (
    <div className="relative w-full " ref={containerRef}>
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          value={value}
          onFocus={() => suggestions && setShowDropdown(true)}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          //defaultValue={searchQuery}
          placeholder="Search categories..."
          className="pl-9 pr-9"
        />
        {value && (
          <button
            onClick={handleRefresh}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div className="absolute mt-2 w-full bg-white border rounded-md shadow-lg z-30 max-h-60 overflow-y-auto">
          {loading && <div className="p-3 text-sm text-gray-600">Searching...</div>}
          {showDropdown &&
            suggestions?.map((text, i) => (
              <button
                key={i}
                className={cn("w-full text-left px-3 text-black py-2 text-sm hover:bg-emerald-100")}
                onClick={() => {
                 onChange(text.name);
                  onSubmit();
                  setShowDropdown(false);
                }}
              >
                    {text.name}
                    
              </button>
            ))}
        </div>
      )}
    </div>
  );
});
