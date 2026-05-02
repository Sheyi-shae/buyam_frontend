"use client";
import AuthPage from '@/components/_user/auth-page'
import { PageLoader } from '@/components/loading-spinners'
import React, { Suspense } from 'react'

export default function page() {
  return (
      <Suspense fallback={<PageLoader />}>
      <AuthPage />
    </Suspense>
  )
}
