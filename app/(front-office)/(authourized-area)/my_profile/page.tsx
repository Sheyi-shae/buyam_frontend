"use client"
import LoadingSpinners from '@/components/loading-spinners'
import ProfileTab from '@/components/profile/profile-tab'
import PublicVendorHeader from '@/components/public-vendor/public-vendor-header'
import { useAuthStore } from '@/stores/auth-stores'
import { VendorProfileProps } from '@/types/users'
import { useFetchPrivateData } from '@/utils/fetch-hooks'
import { useMemo, useState } from 'react'


export default function PrifilePage() {
    const [activeTab, setActiveTab] = useState("store")
      const {user}=useAuthStore()
    
      // fetch user profile by public id
      const { data, isLoading } = useFetchPrivateData<VendorProfileProps>({
        queryKey: "my_profile",
        requestUrl: `/user/me`,
         queryParams:user?.id
        
      }) 
    const vendorData = useMemo(() => data as VendorProfileProps, [data])
     
     
   
      if(isLoading) return <LoadingSpinners text="Fetching  profile..."/>
   
   
    
  return (
      <div className="min-h-screen mt-16 bg-background">
    
      <main className="container mx-auto px-4 py-8">
       {vendorData.verifiedSeller && <PublicVendorHeader vendorData={vendorData} />} 
        <ProfileTab activeTab={activeTab} setActiveTab={setActiveTab} vendor={vendorData} />
        </main>
    
   </div>
  )
}
