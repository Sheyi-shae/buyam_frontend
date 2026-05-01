"use client"

import { ProductListing, UserReview, VendorProfileProps } from "@/types/users"
import { MessageCircleIcon, ShoppingBasket, Star, Store, User } from "lucide-react"
import { useMemo } from "react"
import VendorStore from "../public-vendor/tabs/vedor-store"
import ProfileReviews from "./profile-reviews"
import { ProfileDisplay } from "./profile-display"
import MessageLayout from "../message-system/message-layout"
import ProfileStore from "./store/profile-store"

interface TabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  vendor: VendorProfileProps
}



export default function ProfileTab({ activeTab, setActiveTab, vendor }: TabsProps) {
    const tabs = [
        { id: "store", label: "Store", icon: Store },
        { id: "reviews", label: "Reviews", icon: Star },
        { id: "profile", label: "Profile", icon: User},
        { id: "sold", label: "Sold-Items", icon: ShoppingBasket },
        { id: "messages", label: "Messages", icon: MessageCircleIcon },
    ]
    
  const vendorProducts = vendor?.products as ProductListing[]
  const activeProducts= vendorProducts.filter((product)=>!product.isSold)
  const vendorReviews = useMemo(() => vendor?.reviews as UserReview[], [vendor])
  const soldItems = useMemo(() => vendorProducts?.filter((product) => product.isSold), [vendorProducts])
 
  //console.log("user",vendor)
  return (
    <div>
   <div>
         {/* Tab Navigation */}
         <div className="border-b border-border bg-card rounded-t-xl overflow-hidden">
           <div className="flex gap-0  overflow-x-auto">
             {tabs.map((tab) => {
               const Icon = tab.icon
               return (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={`flex-1 md:flex-none mx-auto flex items-center justify-center gap-2 px-4 ${tabs.length <3 ? "md:px-44 " :"md:px-18"} py-4 font-semibold text-sm md:text-base border-b-2 transition-all whitespace-nowrap ${
                     activeTab === tab.id
                       ? "border-primary text-primary bg-muted/30"
                       : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/20"
                   }`}
                 >
                   <Icon className="w-4 h-4 md:w-5 md:h-5" />
                   {tab.label}
                 </button>
               )
             })}
           </div>
         </div>
   
         {/* Tab Content */}
         <div className={`${activeTab === "messages" && "h-[calc(120vh-10vh)]"} bg-card  border-x border-b border-border rounded-b-xl p-2 md:p-6`}>
           {activeTab === "store" && <ProfileStore products={activeProducts} />}
          {activeTab === "reviews" && <ProfileReviews vendor={vendorReviews} vendorPublicId={vendor.publicId}  />}
          {activeTab === "profile" && <ProfileDisplay user={vendor} vendorProducts={vendorProducts} />}
          {activeTab === "sold" && <ProfileStore products={soldItems}  />}
          {activeTab === "messages" && <MessageLayout />}
           
         </div>
       </div>   
    </div>
  )
}
