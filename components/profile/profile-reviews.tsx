"use client"

import { useAuthStore } from "@/stores/auth-stores"
import { UserReview } from "@/types/users"
import apiPrivate, { parseErrorMessage } from "@/utils/api-private"
import { useQueryClient } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { toast } from "sonner"
import VendorRatingSummary from "../public-vendor/vendor-rating-summary"
import VendorReviewsList from "../public-vendor/vendor-reviews-list"

interface VendorReviewsProps {
  vendor: UserReview[]
  vendorPublicId?: string;

  
}

export default function ProfileReviews({ vendor,vendorPublicId}: VendorReviewsProps) {

  const [showReviewForm, setShowReviewForm] = useState<boolean>(true)
  const [activeReview, setActiveReview] = useState<number | null>(null)
 
  const [reply, setReply] = useState<string>('')

  const [submitting, setSubmitting] = useState<boolean>(false)
  const queryClient= useQueryClient()
  const { user } = useAuthStore()
  
  
  const toggleReplyForm = (reviewId: number) => {
     setShowReviewForm(!showReviewForm)
    setActiveReview(activeReview === reviewId ? null : reviewId)
  }

  
    // calculate average rating
   const averageRating = useMemo(() => {
      if (vendor.length === 0) return 0;
     const avgRate=vendor.reduce((a, r) => a + r.ratings, 0) / vendor.length;
     // round off to the nearest whole number
     return Math.ceil(avgRate)
   }, [vendor]);


  
  // reply submit
  async function handleSubmitReply(reviewId:number) {
    try {
      setSubmitting(true)
      const replyData = { reply, reviewId, name: user?.name }
      await  apiPrivate.post(`/user-review/${vendorPublicId}/reply`,replyData)
    
      queryClient.invalidateQueries({ queryKey: ['my_profile',user?.id] })
     
      setReply('');
    
    } catch (error: unknown) {
      parseErrorMessage(error)
      toast.error(parseErrorMessage(error))
      
    }finally{
      setSubmitting(false)
    }
    
  }

  // handle reviw likes
  async function handleReviewLike(reviewId: number) {
    try {
      setSubmitting(true)
      await apiPrivate.post(`/user-review/${vendorPublicId}/like`, { reviewId,userId:user?.id })
      queryClient.invalidateQueries({ queryKey: ['user-profile', vendorPublicId] })
    } catch (error: unknown) {
      parseErrorMessage(error)
      toast.error(parseErrorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }
  
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Customer Reviews & Ratings</h2>

        {/* Rating Summary */}
        <VendorRatingSummary
          vendor={vendor}
          averageRating={averageRating} />
      </div>

      {/* Reviews List */}
      <VendorReviewsList
      vendor={vendor}
      userId={user?.id}
      activeReview={activeReview}
      toggleReplyForm={toggleReplyForm}
      reply={reply}
      handleReviewLike={handleReviewLike}
      setReply={setReply}
      handleSubmitReply={handleSubmitReply}
      />



    </div>
  )
}
