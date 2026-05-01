"use client"
import FilterSidebar from '@/components/product/product-filter'
import ProductGrid from '@/components/product/product-listing'
import SearchBar from '@/components/product/search-bar'
import { useSearchStore } from '@/stores/search-store'
import { useDebounce } from '@/utils/debounce'
import { useProductWithSuggestions, useQueryProducts } from '@/utils/query-products'
import { useEffect, useMemo, useState } from 'react'
import { ProductListing } from '@/types/users'


type Mode = "default" | "suggestion" | "search";
type PPageProps={
  slug: string
  searchParams:string  | undefined 
}
 
export default function ProductPage({ slug, searchParams }: PPageProps) {
  const [searchQuery, setSearchQuery] = useState(searchParams ?? "");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [page, setPage] = useState(1);
  const { addSearch, } = useSearchStore()
  const [defaultProducts, setDefaultProducts] = useState<ProductListing[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductListing[]>([]);

 
 
  const [mode, setMode] = useState<Mode>("default");
  // fetch all products 
  const { data, isLoading } = useQueryProducts(slug, submittedQuery, page, 10, selectedState, selectedCity)
  const { data: suggestionData, isLoading: isSuggestionsLoading } = useProductWithSuggestions(slug, debouncedSearch, selectedState, selectedCity)

  // pagination meta
  const paginationMeta = useMemo(() => data?.meta, [data?.meta]);
  const handlePreviousPage = () => setPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => {
    if (paginationMeta?.totalPages && page < paginationMeta.totalPages) {
      setPage((p) => p + 1);
    }
  };


  const activeData = useMemo(() => {
    if (mode === "search") return data?.data || [];
    return data?.data || [];
  }, [mode, data?.data]);

  useEffect(() => {
    setDefaultProducts(activeData);
    setFilteredProducts(activeData);
  }, [activeData]);
 
  const handleSearch = () => {
    setSubmittedQuery(searchQuery)
    setMode("search")
    addSearch(searchQuery)
    setPage(1)

  }
  useEffect(() => {
    if (searchParams) {
      setSearchQuery(searchParams);
    }
  }, [searchParams]);
 
 
  const queryParams = `${slug}, ${submittedQuery}, ${page} , ${10}, ${selectedState}, ${selectedCity}`
  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <main className="container mx-auto px-4 py-8">
        <SearchBar
          setSubmittedQuery={setSubmittedQuery}
          searchQuery={searchQuery}
          selectedCity={selectedCity}
          selectedState={selectedState}
          setSearchQuery={setSearchQuery}
          setSelectedCity={setSelectedCity}
          setSelectedState={setSelectedState}
          handleSearch={handleSearch}
          suggestionData={suggestionData}
          loading={isSuggestionsLoading}
        />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <FilterSidebar
            defaultProducts={defaultProducts}  
            setFilteredProducts={setFilteredProducts}
            mode="frontpage"
          />
          <ProductGrid
            defaultProducts={filteredProducts}
            setDefaultProducts={setDefaultProducts}
            isLoading={isLoading}
            paginationMeta={paginationMeta}
            page={page}
            queryParams={queryParams}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />

         
        </div>
      </main>
    </div>
  )
}
