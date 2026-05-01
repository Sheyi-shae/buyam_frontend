"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface FilterProps<T> {
  filterFunction?: (val: T) => void;
  title: string;
  items: string[];
  id: string;
  selected: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}

export const FilterSection = <T,>({
  title,
  items,
  id,
  filterFunction,
  selected,
  setSelected
}: FilterProps<T>) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("category");
 

  const handleSelect = (item: string) => {
    setSelected(item);  
    filterFunction?.(item as T);
  };

  return (
    <div className="border-b border-border pb-4">
      <button
        onClick={() => setExpandedCategory(expandedCategory === id ? null : id)}
        className="flex items-center justify-between w-full text-primary transition"
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            expandedCategory === id ? "rotate-180" : ""
          }`}
        />
      </button>

      {expandedCategory === id && (
        <div className="mt-3 space-y-2">
          {items.map((item) => (
            <label key={item} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selected === item}
                onChange={() => handleSelect(item)}
                className="w-4 h-4 rounded border-border text-primary cursor-pointer"
              />
              <span
                onClick={() => handleSelect(item)}
                className="text-sm capitalize text-foreground group-hover:text-primary transition"
              >
                {item}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
