import MyListings from '@/components/_user/_mylistings/my-listings'
import { PageLoader } from '@/components/loading-spinners'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <div>
      <Suspense fallback={<PageLoader/>}>
        <MyListings/>
      </Suspense>
    </div>
  )
}
