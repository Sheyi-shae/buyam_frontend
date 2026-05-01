"use client"
import { useAuthStore } from '@/stores/auth-stores'
import { ProductListing, VendorProfileProps } from '@/types/users'
import { useFetchPrivateData } from '@/utils/fetch-hooks'
import { useMemo } from 'react'
import LoadingSpinners from '../loading-spinners'

export default function MyListingPage() {
 
    
       const {user}=useAuthStore()
        
          // fetch user profile by public id
          const { data, isLoading } = useFetchPrivateData<VendorProfileProps>({
            queryKey: "my_listing",
            requestUrl: `/user/me`,
             queryParams:user?.id
            
          }) 
    const vendorData = useMemo(() => data as VendorProfileProps, [data])

    const activeItems = useMemo(() => vendorData?.products as ProductListing[], [vendorData.products])
      const soldItems = useMemo(() => vendorData?.products?.filter((product) => product.isSold), [vendorData.products])
    
   
    if (isLoading)
        return <LoadingSpinners text="Fetching my listings" />
  return (
    <div>my-listing-page</div>
  )
}
