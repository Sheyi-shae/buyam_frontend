"use client"

import { Button } from "@/components/ui/button"
import { ProductListing } from "@/types/users"
import { timeAgo } from "@/utils/date-format"
import { formatCurrency } from "@/utils/format-currency"
import { ArrowRight, Clock, MapPin, User2, UserCheck } from "lucide-react"
import { ProductCardSlide } from "../animations/product-slider"
import LoadingSpinners from "../loading-spinners"
import ProductSorting from "./product-sorting"
import Link from "next/link"
import { ProductCardSkeleton } from "../skeletons/product-card-sketeton"



interface PaginationMeta {
 
  totalPages: number;
  currentPage?: number;
}
interface ProductGridProps {
  defaultProducts: ProductListing[],
  isLoading: boolean,
  paginationMeta?: PaginationMeta
  page?:number
  handlePreviousPage?:()=>void
  handleNextPage?: () => void
  setDefaultProducts: React.Dispatch<React.SetStateAction<ProductListing[]>>
  queryParams?:string
}

export const getConditionColor = (condition: string) => {
  switch (condition) {
    case "New":
      return "bg-green-100 text-green-800"
    case "Fairly-used":
      return "bg-blue-100 text-blue-800"
    case "Used":
      return "bg-yellow-100 text-yellow-800"
   
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ProductGrid({defaultProducts,queryParams, setDefaultProducts, isLoading, handleNextPage, handlePreviousPage, paginationMeta, page }: ProductGridProps) {


  // sort product by price low to high
  const sortProductsByPriceLowToHigh = () => {
    const sortedProducts = [...defaultProducts].sort((a, b) => a.price - b.price);
    setDefaultProducts(sortedProducts);
  };
  // sort product by price high to low
  const sortProductsByPriceHighToLow = () => {
    const sortedProducts = [...defaultProducts].sort((a, b) => b.price - a.price);
    setDefaultProducts(sortedProducts);
  };
  // most recent
  const sortProductsByMostRecent = () => {
    const sortedProducts = [...defaultProducts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setDefaultProducts(sortedProducts);
  };
  // most popular by highest likes
  const sortProductsByMostPopular = () => {
    const sortedProducts = [...defaultProducts].sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
    setDefaultProducts(sortedProducts);
  };
 
 

  return (
    <div className="lg:col-span-3">
      <ProductSorting
      sortProductsByMostPopular={sortProductsByMostPopular}
      sortProductsByMostRecent={sortProductsByMostRecent}
      defaultProducts={defaultProducts}
      sortProductsByPriceLowToHigh={sortProductsByPriceLowToHigh}
      sortProductsByPriceHighToLow={sortProductsByPriceHighToLow}
      setDefaultProducts={setDefaultProducts}
      />
      
      {/* loading state */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {isLoading
    && Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))
   }
</div>
    
{defaultProducts.length===0 && (<p className="text-center text-muted-foreground">No products found.</p>
)}
      
      
      <div className="pcard-grid sm:grid-cols-2">
        {defaultProducts?.map((item) => (
          <div
            key={item.id}
            className=" pcard-wrap"
          >
          <div className="pcard">
            {/* product image here */}
              <ProductCardSlide
                item={item}
                intervalMs={3000}
                queryFn="subcategory-products"
                //disable like button
                mode="profile"
              />

             {/* Body */}
              <div className="pcard-body">
              <p className="uppercase font-light text-primary text-xs">{item.subCategory.name}</p>
              <h4 className="pcard-title capitalize">{item.name}</h4>
              
            {/* data */}
                  <div className="pcard-meta">
                  <div className="pcard-meta-row">
                    <User2 size={13} />
                  {item.seller.name}
                  </div>
                  <div className="pcard-meta-row">
                    <MapPin size={13} />
                    {item.state}
                  </div>
                  <div className="pcard-meta-row">
                    <Clock size={13} />
                    {timeAgo(item.createdAt)}
                  </div>
                </div>
                
                                <div className="pcard-footer">
                                  <span className="pcard-price">{formatCurrency(item.price)}</span>
                                  <Link
                                    href={`/categories/${item.subCategory.slug}/${item.slug}`}
                                    className="pcard-cta"
                                  >
                                    View details
                                    <ArrowRight size={13} />
                                  </Link>
                                </div>
            
              <div className="flex border-t py-2 mt-1 border-t-slate-300 gap-2 text-slate-400 text-xs "><UserCheck className="w-4 h-4"/> {item.seller.name}</div>

            </div>
            </div>
            </div>
        ))}
      </div>
      {/* pagination here */}
      {paginationMeta  && (
            <div className="flex justify-center items-center gap-4 pt-6">
              <Button
                variant="outline"
                disabled={page === 1 || isLoading}
                onClick={handlePreviousPage}
              >
                Previous
              </Button>

              <span className="text-sm text-gray-600">
                Page {page} of {paginationMeta.totalPages}
                {isLoading && " (Loading...)"}
              </span>

              <Button
                variant="outline"
                disabled={page === paginationMeta.totalPages || isLoading}
                onClick={handleNextPage}
              >
                Next
              </Button>
            </div>
          )}
    </div>
  )
}
