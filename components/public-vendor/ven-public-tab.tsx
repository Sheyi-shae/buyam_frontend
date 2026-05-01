"use client"
import { Store, Star, User } from "lucide-react"
import VendorStore from "./tabs/vedor-store"
import VendorReviews from "./tabs/vendor-reviews"
import VendorProfile from "./tabs/vendor-profile"
import { useMemo } from "react"
import { ProductListing, UserReview, VendorProfileProps } from "@/types/users"

interface TabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  vendor: VendorProfileProps
}

const tabs = [
  { id: "store", label: "Store", icon: Store },
  { id: "reviews", label: "Reviews", icon: Star },
]

export default function VendorPublicProfileTabs({ activeTab, setActiveTab, vendor }: TabsProps) {
    const vendorProducts = useMemo(() => vendor?.products as ProductListing[] || [], [vendor])
  const vendorReviews = useMemo(() => vendor?.reviews as UserReview[] || [], [vendor])
  
  console.log("vendor details",vendor)
  return (
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
                className={`flex-1 md:flex-none mx-auto flex items-center justify-center gap-2 px-4 md:px-44  py-4 font-semibold text-sm md:text-base border-b-2 transition-all whitespace-nowrap ${
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
      <div className="bg-card border-x border-b border-border rounded-b-xl p-6">
        {activeTab === "store" && <VendorStore products={vendorProducts} />}
        {activeTab === "reviews" && <VendorReviews vendor={vendorReviews} vendorPublicId={vendor.publicId} vendorId={vendor.id}  />}
        
      </div>
    </div>
  )
}
