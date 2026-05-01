"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { ArrowRight, ChevronDown, Grid3x3, Package } from "lucide-react"
import { useFetchPublicData } from "@/utils/fetch-hooks"
import LoadingSpinners from "../loading-spinners"
import { CategoryD } from "@/types/users"
import Link from "next/link"
import Image from "next/image"


interface CategoryCardProps {
  category: CategoryD
  isExpanded: boolean
  onToggle: () => void
}

export function CategoryCard({ category, isExpanded, onToggle }: CategoryCardProps) {
  return (
    <div className="group relative ">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-amber-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 shadow-sm hover:shadow-xl">
        {/* Header Section */}
        <button
          onClick={onToggle}
          className="w-full p-8 flex items-start justify-between hover:bg-emerald-50/5 transition-colors duration-300"
        >
          <div className="flex items-start gap-6 flex-1">
            {/* Icon Container with Gradient */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl opacity-10 blur-lg" />
              <div className="relative p-4 bg-gradient-to-br from-emerald-100/50 to-emerald-50/50 rounded-2xl border border-emerald-200/50 backdrop-blur-sm">
                <Image
                  src={category.avatar || "/fallback.png"}
                  width={48}
                  height={48}
                  alt={`${category.name} icon`}
                  className="w-12 h-12 rounded-xl object-cover"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground group-hover:text-emerald-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 mb-3">{category.description}</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                    {category.products.length}
                  </span>
                  <span className="text-sm text-muted-foreground">listings</span>
                </div>
                <div className="h-1 w-8 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
                <span className="text-xs font-medium text-muted-foreground px-3 py-1 bg-amber-50/50 rounded-full border border-amber-200/50">
                  {category.subcategories.length} subcategories
                </span>
              </div>
            </div>
          </div>

          {/* Chevron Icon */}
          <ChevronDown
            className={`w-6 h-6 text-emerald-600 flex-shrink-0 transition-all duration-500 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Expanded Subcategories Section */}
        {isExpanded && (
          <div className="border-t border-border/50 px-8 py-6 bg-gradient-to-b from-emerald-50/30 via-transparent to-transparent animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Explore Subcategories
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {category.subcategories.map((subcategory) => (
                <Link
                  key={subcategory.id}
                  href={`/categories/${subcategory.slug}`}
                  className="group/sub px-4 py-3 rounded-xl bg-background border border-border/50 hover:border-amber-500/50 hover:bg-amber-50/30 transition-all duration-300 flex items-center justify-between hover:shadow-md"
                >
                  <p className="text-sm font-medium text-foreground group-hover/sub:text-amber-700 transition-colors">
                    {subcategory.name}
                  </p>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover/sub:text-amber-600 transition-all duration-300 group-hover/sub:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function CategoriesPage() {
    const [expandedId, setExpandedId] = useState<number | null>(null)
    // fetch categories from server/controllers/category.ts
const {data,isLoading,isError} = useFetchPublicData({
  queryKey: 'all-categories',
  requestUrl: '/category',
})
const category = useMemo(
  () => (data as CategoryD[]) || [],
  [data]
);


   

    if (isLoading) {
      return <LoadingSpinners text="Loading categories" />;
    }

  return (
    <div className="min-h-screen ">
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
       
         {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-4xl sm:text-5xl cat-heading mb-3 tracking-tight">
              Browse Categories
            </h1>
            <p className="text-sm font-light sm:text-base text-gray-600 max-w-2xl mx-auto">
              Explore all available categories and find exactly what you are looking for. Click on any category to view
            subcategories.
            </p>
          </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-4">
          {category.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isExpanded={expandedId === cat.id}
              onToggle={() => setExpandedId(expandedId === cat.id ? null : cat.id)}
            />
          ))}
        </div>

       
      </main>
    </div>
  )
}
