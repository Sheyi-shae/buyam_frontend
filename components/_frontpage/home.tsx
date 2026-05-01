'use client';

import { CategoryD } from '@/types/users';
import { useFetchPublicData } from '@/utils/fetch-hooks';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import LoadingSpinners from '../loading-spinners';
import CategorySections from './category-sections';
import Hero from './hero';
import HomeListings from './home-listings';
import VerifiedVendors from './verified-vendors';






export default function Home() {
  const { data, isLoading } = useFetchPublicData({
    queryKey: "home-categories",
    requestUrl:"/category"
  })

const category = useMemo(
  () => (data as CategoryD[]) || [],
  [data]
);

const products = useMemo(
  () => category?.flatMap(c => c.products),
  [category]
);

  
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-amber-50">
      

      <section className="relative pt-28 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-amber-50 to-emerald-50 opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* hero  */}
          <Hero/>

                  {/* categories here */}
       <CategorySections category={category} isLoading={isLoading} />
                  
        </div>
      </section>

     
      <HomeListings products={products} />

     <VerifiedVendors/>

      

      {/* <footer className=" py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-amber-500 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Buyam</span>
              </div>
              <p className="text-sm text-gray-400">
                Your trusted multi-vendor marketplace for quality products from verified sellers.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Shop</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">All Categories</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Trending Products</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">New Arrivals</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Best Sellers</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Vendors</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Become a Vendor</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Vendor Directory</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Vendor Resources</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Success Stories</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Shipping Info</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Returns</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Buyam. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
