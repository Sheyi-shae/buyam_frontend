"use client"

import LoadingSpinners from "@/components/loading-spinners"
import PublicVendorHeader from "@/components/public-vendor/public-vendor-header"
import VendorPublicProfileTabs from "@/components/public-vendor/ven-public-tab"
import { VendorProfileProps } from "@/types/users"
import { useFetchPrivateData } from "@/utils/fetch-hooks"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"

export default function VendorProfilePage() {
const [activeTab, setActiveTab] = useState("store")
  const params = useParams()

  // fetch user profile by public id
  const { data, isLoading } = useFetchPrivateData<VendorProfileProps>({
    queryKey: "user-profile",
    requestUrl: `/user/vendor/${params.id}`,
     queryParams:`${params.id}`
    
  }) 

  const vendorData = useMemo(() => data as VendorProfileProps, [data])
  
  

   if(isLoading) return <LoadingSpinners text="Fetching vendor profile..."/>


  return (
    <div className="min-h-screen bg-background mt-16">
    
      <main className="container mx-auto px-4 py-8">
        <PublicVendorHeader vendorData={vendorData} />
        <VendorPublicProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} vendor={vendorData} />
      </main>
    </div>
  )
}
