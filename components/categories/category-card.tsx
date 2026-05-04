"use client"

import { useMemo, useState } from "react"
import { ChevronDown, ArrowRight, FolderOpen, FolderX, PackageOpen } from "lucide-react"
import { useFetchPublicData } from "@/utils/fetch-hooks"
import { CategoryD } from "@/types/users"
import Link from "next/link"
import Image from "next/image"
import { EmptyItem } from "../_frontpage/empty-item"

interface CategoryCardProps {
  category: CategoryD
  isExpanded: boolean
  onToggle: () => void
}

function CategoryCard({ category, isExpanded, onToggle }: CategoryCardProps) {
  return (
    <div className="border rounded-xl bg-white shadow-sm hover:shadow-md transition">
      {/* HEADER */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <div className="flex items-start gap-4">
          {/* ICON */}
          <div className="w-14 h-14 rounded-lg overflow-hidden border bg-gray-100">
            <Image
              src={category.avatar || "/fallback.png"}
              alt={category.name}
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          </div>

          {/* TEXT */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {category.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {category.description}
            </p>

            <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
              <span>
                <strong>{category.products.length}</strong> listings
              </span>
              <span>
                <strong>{category.subcategories.length}</strong> subcategories
              </span>
            </div>
          </div>
        </div>

        {/* CHEVRON */}
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* EXPANDED */}
      {isExpanded && (
        <div className="border-t px-6 pb-6 pt-4 bg-gray-50">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {category.subcategories.map((sub) => (
              <Link
                key={sub.id}
                href={`/categories/${sub.slug}`}
                className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 transition group"
              >
                <span className="text-sm text-gray-700 group-hover:text-black">
                  {sub.name}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function CategoriesPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const { data, isLoading } = useFetchPublicData({
    queryKey: "all-categories",
    requestUrl: "/category",
  })

  const categories = useMemo(
    () => (data as CategoryD[]) || [],
    [data]
  )

  return (
    <div className="min-h-screen ">
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl cat-heading sm:text-4xl font-semibold text-gray-900">
            Browse Categories
          </h1>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            Explore categories and drill down into subcategories to find what you need.
          </p>
        </div>

        {/* CONTENT */}
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : categories.length > 0 ? (
          <div className="space-y-4">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                isExpanded={expandedId === cat.id}
                onToggle={() =>
                  setExpandedId(expandedId === cat.id ? null : cat.id)
                }
              />
            ))}
          </div>
        ) : (
          
              <EmptyItem
                icon={PackageOpen}
                title="No categories available"
                description="There are currently no categories to display. Please check back later."
              />
    
        )}
      </main>
    </div>
  )
}