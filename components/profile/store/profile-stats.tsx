'use client'

import { ProductListing, User } from "@/types/users"
import { Eye, Heart, Package, ShoppingBag, ThumbsUp } from "lucide-react"

interface ProfileStatsProps{
    vendorProducts: ProductListing[]
    user: User
}

export default function ProfileStats({user,vendorProducts}:ProfileStatsProps) {
     // get total product likes 
    const TotalProductLikes = vendorProducts.reduce((total, product) => total + product.likes.length, 0)
    // get total product views
    const TotalProductViews = vendorProducts.reduce((total, product) => total + product.views, 0)
    const soldItems = vendorProducts.filter((product) => product.isSold)
    
  return (
    <div className="grid grid-cols-3 gap-4 p-6 space-y-6 bg-muted/30 rounded-2xl border border-border/50">
                <div className="text-center space-y-1">
                  <div className="flex justify-center mb-1">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-2xl font-serif">{vendorProducts.length || 0}</div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Listings</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="flex justify-center mb-1">
                    <ShoppingBag className="w-5 h-5 text-amber-500 fill-amber-500" />
                  </div>
                  <div className="text-2xl font-serif">{soldItems.length || 0}</div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Sales</div>
                              </div>

                              {/* items you liked */}
                   <div className="text-center space-y-1">
                  <div className="flex justify-center mb-1">
                    <ThumbsUp className="w-5 h-5 text-amber-500 fill-amber-500" />
                  </div>
                  <div className="text-2xl font-serif">{user?.likedProducts?.length || 0}</div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Liked Items</div>
                              </div>   
                              {/*Item likes  */}
                   <div className="text-center space-y-1">
                  <div className="flex justify-center mb-1">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  </div>
                  <div className="text-2xl font-serif">{TotalProductLikes || 0}</div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Liked Your Items</div>
                              </div>  
                              {/* views */}
                              <div className="text-center space-y-1">
                  <div className="flex justify-center mb-1">
                    <Eye className="w-5 h-5 text-primary " />
                  </div>
                  <div className="text-2xl font-serif">{TotalProductViews || 0}</div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Views</div>
                              </div>
                              
              </div>
  )
}
