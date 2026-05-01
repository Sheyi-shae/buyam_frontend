import { ProductDetail } from '@/types/users'
import { timeAgo } from '@/utils/date-format'
import { StarRating } from '@/utils/star-rating'
import { AlertTriangle, ShieldAlert, ShieldCheck, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function SellerInfoCard({ productData }: { productData: ProductDetail }) {
  const reviews = productData.seller.reviews ?? []

const reviewCount = reviews.length

const averageRating =
  reviewCount > 0
    ? reviews.reduce((acc, r) => acc + r.ratings, 0) / reviewCount
    : 0
  return (
    <div className="sticky top-4 mt-8 md:mt-0 bg-white p-6 rounded-xl shadow-lg border-2 border-emerald-500/20">
      <h2 className="font-light  text-gray-700 mb-4 flex items-center space-x-2">
        <User size={20} className="bg-emerald-50 rounded-full text-emerald-600" />
        <span>Seller Details</span>
      </h2>
      <div className="flex items-center space-x-4 border-b pb-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl font-bold">
         <Image
        src={productData.seller.avatar || "/default-avatar.png"}
        alt="User Avatar"
        width={200}
        height={200}
        className="w-16 h-16 rounded-full object-cover"
        />
        </div>
        <div>
          <p className="font-semibold text-gray-800">
            {productData.seller.name}
          </p>
          {productData.seller.verifiedSeller ? (
            <span className="text-xs  text-white bg-emerald-500 px-2 py-0.5 rounded-full inline-flex mt-0.5">
               <ShieldCheck size={16} className='text-white text-xs'/>  Verified Seller
            </span>
          ): (
            <span className="gap-2 text-xs  text-white bg-red-500 px-2 py-0.5 rounded-full inline-flex mt-0.5">
              <ShieldAlert size={16} className='text-white text-xs'/> Unverified Seller
            </span>  
          )}  
        
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Rating:</span>
          <div className="flex items-center space-x-1">
            <StarRating rating={averageRating} />
            <span className="text-sm font-semibold text-amber-600">
              {averageRating.toFixed(1)} / 5
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Reviews:</span>
          <span className=" text-gray-800">{reviews.length}</span>
        
              </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Member Since:</span>
          <span className="text-sm text-gray-800">{timeAgo(productData.seller.createdAt)}</span>
        </div>
      </div>
      <Link href={`/vendor/${productData.sellerPublicId}`}><button className="w-full mt-4 py-3 bg-emerald-50 text-emerald-600   text-sm rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-300">View Seller Profile</button>
        
      </Link>
      <a href="#" className="flex items-center justify-center mt-3 text-sm text-gray-500 hover:text-red-500 transition-colors">
        <AlertTriangle size={16} className="mr-1" /> Report this Listing
      </a>
    </div>

  )
}
