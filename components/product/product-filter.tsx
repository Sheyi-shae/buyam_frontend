"use client"

import { ProductListing } from "@/types/users"
import { useMemo, useState } from "react"
import { Button } from "../ui/button"
import { FilterSection } from "./filter-section"

interface ProductGridProps {
  defaultProducts: ProductListing[],
  setFilteredProducts: React.Dispatch<React.SetStateAction<ProductListing[]>>
  mode: "frontpage" | "vendor"
}

export default function FilterSidebar({ setFilteredProducts,defaultProducts, mode }: ProductGridProps) {
  const [selected, setSelected] = useState<string | null>(null);
 

  const Negotiable = ["Yes", "No"]
  const conditions = ["New", "Fairly-used", "Used"]
 
  const priceRanges = ["Under ₦5000", "₦5000 - ₦20000", "₦20000 - ₦50000", "₦50000 - ₦100000", "₦100000 and above"]
 

  // extract categories from defaultProducts
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    defaultProducts.forEach(product => {
      uniqueCategories.add(product.category?.name);
    });
    return Array.from(uniqueCategories);
  }, [defaultProducts]);

// filter products by negotiable
  const filterByNegotiable = (negotiable: string ) => {
    switch (negotiable) {
      case "Yes":
        const filteredProducts1 = defaultProducts.filter(product => product.negotiable );
        setFilteredProducts(filteredProducts1);
        break;
      case "No":
        const filteredProductsNo = defaultProducts.filter(product => !product.negotiable );
        setFilteredProducts(filteredProductsNo);
        break;
      default:
        setFilteredProducts(defaultProducts);
        break;
    }
  }

  const filterByCategory = (category: string) => {
    const filteredProductsC = defaultProducts.filter(product => product.category.name === category);
    setFilteredProducts(filteredProductsC);
  }

  
  const filterByCondition = (condition: string) => {
    const filteredProductsC = defaultProducts.filter(product => product.condition === condition);
    setFilteredProducts(filteredProductsC);
  }
 
  // switch case for price range filter
 const handlePriceRange = (range: string) => {
  let min = 0;
  let max = Infinity;

  switch (range) {
    case "Under ₦5000":
      max = 5000;
      break;
    case "₦5000 - ₦20000":
      min = 5000;
      max = 20000;
      break;
    case "₦20000 - ₦50000":
      min = 20000;
      max = 50000;
      break;
    case "₦50000 - ₦100000":
      min = 50000;
      max = 100000;
      break;
    case "₦100000 and above":
      min = 100000;
      break;
  }

  const filtered = defaultProducts.filter(
    (p) => p.price >= min && p.price <= max
   );


  setFilteredProducts(filtered);
};


  // clear all filters
 const clearFilters = () => {
  setSelected(null);
  setFilteredProducts(defaultProducts); 
};


  return (
    <aside className="lg:col-span-1">
      <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
        <h3 className="text-lg font-bold text-foreground mb-6">Filters</h3>

        <FilterSection title="Negotiable" selected={selected} setSelected={setSelected} filterFunction={filterByNegotiable} items={Negotiable} id="negotiable" />
        <FilterSection title="Condition" selected={selected} setSelected={setSelected} filterFunction={filterByCondition} items={conditions} id="condition" />
        {mode === "vendor" && (
          <FilterSection title="Category" selected={selected} setSelected={setSelected} filterFunction={filterByCategory} items={categories} id="category" />
        )}
        <FilterSection<string>
          selected={selected}
          setSelected={setSelected}
          title="Price Range"
          items={priceRanges}
          filterFunction={(range) => handlePriceRange(range)}
          id="price"
        />

        <Button onClick={()=>clearFilters()} className="w-full mt-6 px-4 py-2 bg-emerald-600 transition font-medium">
          Clear Filters
        </Button>
      </div>
    </aside>
  )
}
