"use client"
import SellProductForm from '@/components/_user/sell-product/sell-product-form'
import { useAuthStore } from '@/stores/auth-stores'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'


export function WarningMsg() {
  return (
    <div className="w-full max-w-2xl  mx-auto px-4 py-6">
      <div className="flex items-start gap-4 p-6 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors shadow-sm">
        {/* Alert Icon */}
        <div className="flex-shrink-0 mt-0.5">
          <AlertCircle className="h-5 w-5 text-destructive" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1">
            Update your mobile number
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Please visit the <Link href="/my_profile" className="text-primary mr-2 hover:underline">
              profile section
            </Link>
             to add your mobile number . This helps buyers contact you and builds trust in your seller profile.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SellPage() {
  const { user } = useAuthStore()

  
  
  return (
    <div className='pt-16 bg-gradient-to-br from-emerald-50 via-white to-amber-50'>
      {!user?.phone && <WarningMsg />}
      <SellProductForm/>
    </div>
  )
  
}
