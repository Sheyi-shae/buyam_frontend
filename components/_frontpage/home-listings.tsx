"use client"
import { Product } from '@/types/users';
import CategoryProductCard from './category-product-card';
import HomeTitleHeader from './home-title-header';


export default function HomeListings({ products }: { products: Product[] }) {
    

    return (
        <section className=" bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* --- Header Section --- */}
         
          <HomeTitleHeader title="Featured Listings" desc="Discover the latest and most popular items ." />
                    
                {/* --- End Header Section --- */}

                <div >
                   <CategoryProductCard items={products} />
                </div>
            </div>
        </section>
    )
}