"use client";

import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import PageTitle from "./page-title";
import { AddCategoryDialog } from "@/components/_admin_components/add-category-dialog";
import { EmptyState } from "./empty-state";
import { useDebounce } from "@/utils/debounce";
import { useCategories } from "@/utils/query-categories";
import { useCategorySuggestions } from "@/utils/query-categories";
import { SearchBar } from "./search-bar";
import { CategoryType } from "@/types/users";
import { CategoryCard } from "./category/category-card";

export default function CategoryDisplay() {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Suggestions only
  const { data: suggestions = [], isLoading: isSuggestionsLoading } =
    useCategorySuggestions(debouncedSearch);

  // Full search results (triggered on submit)
  const { data: categoriesData, isLoading, isFetching } =
    useCategories(submittedQuery, page, 10);

  const categories = useMemo(
    () => (categoriesData?.data as CategoryType[]) || [],
    [categoriesData?.data]
  );
  const paginationMeta = useMemo(() => categoriesData?.meta, [categoriesData?.meta]);


  // submit search
  const handleSearchSubmit = useCallback(() => {
    setSubmittedQuery(searchQuery);
    setPage(1);
  }, [searchQuery]);

  // pagination
  const handleRefresh = () => {
    setSubmittedQuery("")
    setSearchQuery("")
  };
  const handlePreviousPage = () => setPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => {
    if (paginationMeta?.totalPages && page < paginationMeta.totalPages) {
      setPage((p) => p + 1);
    }
  };

  return (
    <div className="space-y-6">
      <PageTitle
        heading="Categories"
        component={<AddCategoryDialog />}
        description="Manage all marketplace categories."
      />

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        handleRefresh={handleRefresh}
        onSubmit={handleSearchSubmit}
        suggestions={suggestions}
        loading={isSuggestionsLoading}
        searchQuery={searchQuery}
      />

      {isLoading ? (
        <div>Loading categories...</div>
      ) : categories.length === 0 ? (
        <EmptyState
          component={<AddCategoryDialog />}
          title={submittedQuery ? "No categories found" : "No categories yet"}
          description={
            submittedQuery
              ? "No categories match your search criteria."
              : "You haven't created any category yet."
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              
              <CategoryCard
                category={category}
                key={Number(category.id)}
              />
            ))}
          </div>

          {paginationMeta && paginationMeta.totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 pt-6">
              <Button
                variant="outline"
                disabled={page === 1 || isFetching}
                onClick={handlePreviousPage}
              >
                Previous
              </Button>

              <span className="text-sm text-gray-600">
                Page {page} of {paginationMeta.totalPages}
                {isFetching && " (Loading...)"}
              </span>

              <Button
                variant="outline"
                disabled={page === paginationMeta.totalPages || isFetching}
                onClick={handleNextPage}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
