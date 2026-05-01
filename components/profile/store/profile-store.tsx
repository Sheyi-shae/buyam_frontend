"use client"

import FilterSidebar from "@/components/product/product-filter"
import { ProductListing } from "@/types/users"
import { useEffect, useState } from "react"
import ProfileProductGrid from "./profile-product-grid"




export default function ProfileStore({ products }: { products: ProductListing[] }) {
   const [defaultProducts, setDefaultProducts] = useState<ProductListing[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductListing[]>([]);

  useEffect(() => {
     setDefaultProducts(products);
     setFilteredProducts(products);
  }, [products]);


  return (
     <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
                  <FilterSidebar
                    defaultProducts={defaultProducts} 
                    setFilteredProducts={setFilteredProducts}
                    mode="vendor"
                  />
                  
                  <ProfileProductGrid
                  defaultProducts={filteredProducts}
                  setDefaultProducts={setDefaultProducts}
                />
                 
                </div>


      </main>
      

    </div>
  )
}
