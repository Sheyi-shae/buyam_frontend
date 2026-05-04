import MyListings from '@/components/_user/_mylistings/my-listings'
import { PageLoader } from '@/components/loading-spinners'
import React, { Suspense } from 'react'
export const dynamic = 'force-dynamic'

export default function page() {
  return (
    <div>
    
        <MyListings/>
      
    </div>
  )
}
