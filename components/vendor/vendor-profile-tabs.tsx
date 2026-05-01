"use client"
import { Store, MessageCircle, Star, User } from "lucide-react"
import VendorStore from "./tabs/vedor-store"
import VendorMessages from "./tabs/vendor-messages"
import VendorReviews from "./tabs/vendor-reviews"
import VendorProfile from "./tabs/vendor-profile"

interface TabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  vendor: any
}

const tabs = [
  { id: "store", label: "Store", icon: Store },
  { id: "messages", label: "Messages", icon: MessageCircle },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "profile", label: "Profile", icon: User },
]

export default function VendorProfileTabs({ activeTab, setActiveTab, vendor }: TabsProps) {
  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-border bg-card rounded-t-xl overflow-hidden">
        <div className="flex gap-0 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 font-semibold text-sm md:text-base border-b-2 transition-all whitespace-nowrap ${
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
        {activeTab === "store" && <VendorStore vendor={vendor} />}
        {activeTab === "messages" && <VendorMessages vendor={vendor} />}
        {activeTab === "reviews" && <VendorReviews vendor={vendor} />}
        {activeTab === "profile" && <VendorProfile vendor={vendor} />}
      </div>
    </div>
  )
}
