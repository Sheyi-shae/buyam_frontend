'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter, Search, Import as SortAsc, X } from 'lucide-react';
import { useState } from 'react';

export type ListingStatus = 'all' | 'active' | 'sold' | 'archived';
export type SortOption = 'newest' | 'oldest' | 'price-high' | 'price-low' | 'most-viewed';

interface ListingFiltersProps {
  onStatusChange?: (status:false | true | null) => void;
  onSortChange?: (sort: SortOption) => void;
  onSearchChange?: (query: string) => void;
  activeStatus?: false | true | null;
  activeSortOption?: SortOption;
}

const statusOptions: { id: number; value: false | true | null; label: string; color: string }[] = [
  {id:1, value: null, label: 'All Items', color: 'bg-gray-100' },
  { id:2, value: false, label: 'Active', color: 'bg-emerald-100' },
  { id:3, value: true, label: 'Sold', color: 'bg-blue-100' },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'most-viewed', label: 'Most Viewed' },
];

export function ListingFilters({
  onStatusChange,
  onSortChange,
  onSearchChange,
  activeStatus = null,
  activeSortOption = 'newest',
}: ListingFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearchChange?.(value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearchChange?.('');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search listings by title, category..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 pr-10 h-10"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        <Select value={activeSortOption} onValueChange={(value) => onSortChange?.(value as SortOption)}>
          <SelectTrigger className="w-full sm:w-48 h-10">
            <SortAsc className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

    
      </div>

      <div className="flex flex-wrap gap-2">
        {statusOptions.map((status) => (
          <button
            key={status.id}
            onClick={() => onStatusChange?.(status.value)}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
              activeStatus === status.value
                ? 'bg-emerald-600 text-white shadow-lg'
                : `${status.color} text-gray-700 hover:shadow-md`
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>

      
    </div>
  );
}
