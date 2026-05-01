import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User } from '@/types/users';
import { useFetchPublicData } from '@/utils/fetch-hooks';
import { ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { useMemo } from 'react';
import Link from 'next/link';
import HomeTitleHeader from './home-title-header';


export default function VerifiedVendors() {

    const { data, isLoading } = useFetchPublicData({
    queryKey: "verified-vendors",
    requestUrl:"/user/verified-sellers"
    }) 

    // memoize the data 
    const vendors = useMemo(() => {
      if (isLoading || !data) return [];
      return (data as User[]) || [];
    }, [data, isLoading]);

    // calculate average rating for each vendor
    const vendorsWithRatings = useMemo(() => {
        return vendors.map(vendor => {
          if (!vendor.reviews) return { ...vendor, rating: 0 };
        const totalReviews = vendor.reviews.length;
        const averageRating = totalReviews > 0 ? vendor.reviews.reduce((sum, review) => sum + review.ratings, 0) / totalReviews : 0;
        return { ...vendor, rating: averageRating };
      });
    }, [vendors]);

    //console.log("vendorsWithRatings", vendorsWithRatings);

  return (
 <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
        
          {/* ── Header ── */}
           
        <HomeTitleHeader title="Verified Vendors" desc="Discover trusted and verified sellers" />
                  

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vendorsWithRatings.map((vendor) => (
              <Card
                key={vendor.name}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-gray-100 hover:border-amber-300 overflow-hidden"
              >
                <div className="relative h-32 overflow-hidden bg-gradient-to-br from-emerald-100 to-amber-100">
                  <img
                    src={vendor.avatar}
                    alt={vendor.storeName || vendor.name}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <CardContent className="p-6 -mt-8 relative">
                  <div className="w-16 h-16 bg-white rounded-full border-4 border-white shadow-lg mb-4 overflow-hidden">
                    <img
                      src={vendor.avatar}
                      alt={vendor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {vendor.storeName || vendor.name}
                    </h3>
                    {vendor.verifiedSeller && (
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                        <ShieldCheck className="w-4 h-4 mr-1" />
                      
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{vendor.rating.toFixed(1)}</span>
                    </div>
                    <span>•</span>
                            <span>{vendor.products?.length} {vendor.products?.length === 1 ? 'Listing' : 'Listings'}</span>
                        </div>
                        
            <Link href={`/vendor/${vendor.publicId}`}  >
                  <Button variant="outline" className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                    Visit Store
                  </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
  )
}
