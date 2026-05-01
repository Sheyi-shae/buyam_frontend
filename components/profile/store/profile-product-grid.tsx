"use client"

import { Button } from "@/components/ui/button"
import { ProductListing } from "@/types/users"
import { timeAgo } from "@/utils/date-format"
import { formatCurrency } from "@/utils/format-currency"
import { Clock, MapPin, UserCheck } from "lucide-react"
import { ProductCardSlide } from "@/components/animations/product-slider"
import Link from "next/link"
import ProductSorting from "@/components/product/product-sorting"
import MoreOptions from "./more-options"


interface ProductGridProps {
  defaultProducts: ProductListing[],
  setDefaultProducts: React.Dispatch<React.SetStateAction<ProductListing[]>>
}



export default function ProfileProductGrid({defaultProducts, setDefaultProducts,  }: ProductGridProps) {


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
     
      {defaultProducts.length === 0 && (
        <p className="text-center text-muted-foreground">No items found.</p>

      )}
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {defaultProducts?.map((item) => (
          <div
            key={item.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
          >
         <ProductCardSlide item={item} mode="profile" intervalMs={3000} queryFn="user-profile" queryParams={item.sellerPublicId} />

            <div className="p-4">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{item.subCategory.name}</p>
             <Link href={`/categories/${item.subCategory.slug}/${item.slug}`}><h4 className="text-lg font-bold text-foreground line-clamp-2 min-h-16">{item.name}</h4></Link>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {item.state}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {timeAgo(item.createdAt)}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-lg sm:text-xl font-bold text-foreground">{formatCurrency(item.price)}</p>
                
                    </div>
                    <div className="flex justify-end">
                <MoreOptions item={item} />
                    </div>


            </div>
          </div>
        ))}
      </div>
      
    </div>
  )
}
