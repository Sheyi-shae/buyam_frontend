"use client"
import { VendorProfileProps } from "@/types/users"
import formatReadableDate, { timeAgo } from "@/utils/date-format"
import { BadgeCheck, Clock, Star, TrendingDown, TrendingUp } from "lucide-react"
import Image from "next/image"
import { useMemo } from "react"
import { StoreUpdateDialog } from "../profile/store-form"
import { useAuthStore } from "@/stores/auth-stores"



export default function PublicVendorHeader({ vendorData }: { vendorData: VendorProfileProps }) {
  const {user}=useAuthStore()

   const averageRating = useMemo(() => {
   const reviews = vendorData?.reviews || [];
   if (reviews.length === 0) return 0;
   const avgRate = reviews.reduce((a, r) => a + r.ratings, 0) / reviews.length;
   return Math.round(avgRate)
 }, [vendorData]);
  
  const ratingPercent = (averageRating / 5) * 100;

  const getRatingDisplay = (ratingPercent: number) => {
  if (ratingPercent >= 70) {
    return {
      icon: <TrendingUp className="w-4 h-4 text-emerald-600" />,
      label: "Positive Rating"
    };
  }

  if (ratingPercent >= 51 && ratingPercent <= 69) {
    return {
      icon: <TrendingUp className="w-4 h-4 text-amber-600" />,
      label: "Average Rating"
    };
    }

  return {
    icon: <TrendingDown className="w-4 h-4 text-red-600" />,
    label: "Negative Rating"
  };
  };
  const { icon, label } = getRatingDisplay(ratingPercent);


   
    // get vendor sellrate
    const soldProducts = vendorData?.products?.filter((product) => product.isSold) || []
    
    const totalProducts = vendorData?.products?.length || 0;
  const sellRate = totalProducts > 0 ? (soldProducts.length / totalProducts) * 100 : 0;
  
  console.log("vendor",vendorData)
  return (
    <div className="mb-8">
      {/* Banner */}
      <div className="relative h-0 rounded-2xl overflow-hidden mb-12 bg-gradient-to-br from-emerald-500/20 to-amber-500/20">
       
      </div>

      {/* Profile Info */}
      <div className="relative px-1 md:px-6 pb-6 -mt-16 z-10">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
          {/* Avatar */}
         

          {/* Info Section */}
          <div className="flex-1">
            <div className="mb-4">
              
              <div className="flex flex-wrap items-center gap-3 mb-2">
                {/* display picture */}
                <div className="flex gap-3">
                  
            <div className="h-32 sm:w-32 rounded-3xl border-4 border-background shadow-xl overflow-hidden bg-card">
              <Image
               src={vendorData?.avatar || '/fallback.png'} 
               alt={vendorData?.name || 'Vendor'} 
               className="w-full h-full object-cover"
               width={128}
               height={128}
               />
            </div>
            
          
                  {/* name and description */}
                  
                  
             
                  {user?.publicId === vendorData.publicId ? (

                  <div className="flex flex-col relative">
                    <span className="flex gap-2">
                      <h1 className="text-2xl sm:text-3xl  font-bold text-foreground">{vendorData?.storeName ? vendorData.storeName : (
                        <span className="text-amber-600 animate-blink">Update your store name</span>
                      )}</h1>
                       {vendorData?.verifiedSeller && (
                  
                    <BadgeCheck className="w-10 h-10 fill-emerald-700 text-white" />
                    
                    )}
                    </span>
                    <p className="text-muted-foreground text-sm sm:text-base w-full sm:max-w-2xl">{vendorData?.storeDescription ? vendorData?.storeDescription.charAt(0).toUpperCase() + vendorData?.storeDescription.slice(1):"Store Description not available"}</p>
                    
                    {/* update button */}
                    {vendorData.verifiedSeller && <div className="absolute bottom-0">
                     <StoreUpdateDialog user={vendorData}/> 
                    </div>}
                  </div>
                  ): (
                    
              
                  <div className="flex flex-col mt-5 relative">
                    <span className="flex gap-2">
                          <h1 className="text-2xl sm:text-3xl  font-bold text-foreground">
                            {vendorData?.storeName ? vendorData.storeName : vendorData.name }</h1>
                       {vendorData?.verifiedSeller && (
                  
                    <BadgeCheck className="w-10 h-10 fill-emerald-700 text-white" />
                    
                    )}
                    </span>
                    <p className="text-muted-foreground text-sm sm:text-base w-full sm:max-w-2xl">{vendorData?.storeDescription ? vendorData?.storeDescription.charAt(0).toUpperCase() + vendorData?.storeDescription.slice(1):"Store Description not available"}</p>
                    
                   
                  </div>
                  )}
                  
                  
                 
              </div>
              </div>
              {/* update form here */}
              
               
            
             
            </div>

            {/* Badges */}
            {/* <div className="flex flex-wrap gap-2 mb-4">
              {vendor.badges.map((badge) => (
                <span key={badge} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
                  {badge}
                </span>
              ))}
            </div> */}

            

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-amber-50 border border-border rounded-lg p-4 ">
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Rating</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="text-xl font-bold text-foreground">{averageRating}</span>
                </div>
              </div>

              <div className="bg-emerald-50 border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Reviews</p>
                <p className="text-xl font-bold text-foreground">{vendorData?.reviews?.length}</p>
              </div>


              <div className="bg-amber-50 border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Sell Rate</p>
                <p className="text-xl font-bold text-emerald-600">{sellRate}%</p>
              </div>
              
              <div className="bg-emerald-50 border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Member Since</p>
                <p className="text-xl font-bold text-emerald-600">{timeAgo(vendorData?.createdAt)}</p>
              </div>

              
            </div>
          </div>

        
        </div>

        {/* Secondary Info */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span className="text-muted-foreground">
              Joined <span className="font-semibold text-foreground">{formatReadableDate(vendorData?.createdAt)}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
           
          {icon} 
<span className="text-muted-foreground">
  {label} <span className="font-semibold text-foreground">{ratingPercent || 0}%</span>
</span>
            
          </div>
        </div>
      </div>
    </div>
  )
}
