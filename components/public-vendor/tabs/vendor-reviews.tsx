"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAuthStore } from "@/stores/auth-stores"
import { UserReview } from "@/types/users"
import apiPrivate, { parseErrorMessage } from "@/utils/api-private"
import { useQueryClient } from "@tanstack/react-query"
import { Star } from "lucide-react"
import { useMemo, useState } from "react"
import { toast } from "sonner"
import VendorRatingSummary from "../vendor-rating-summary"
import VendorReviewsList from "../vendor-reviews-list"

const stars = [1,2,3,4,5];  
interface VendorReviewsProps {
  vendor: UserReview[]
  vendorPublicId?: string;
  vendorId?: number;
  
}

export default function VendorReviews({ vendor,vendorPublicId,vendorId }: VendorReviewsProps) {
  const [ratings, setRatings] = useState<number>(0)
  const [showReviewForm, setShowReviewForm] = useState<boolean>(true)
  const [activeReview, setActiveReview] = useState<number | null>(null)
 
  const [review, setReview] = useState<string>('')
  const [reply, setReply] = useState<string>('')
  const [hover, setHover] = useState<number>(0)
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


  
  // handle submit form
  async function handleSubmitReview() {
    try {
      setSubmitting(true)
      const reviewData={ratings,comment:review,userId:vendorId,name:user?.name}
      await  apiPrivate.post(`/user-review/${vendorPublicId}`,reviewData)
    
      queryClient.invalidateQueries({ queryKey: ['user-profile',vendorPublicId] })
     
      setRatings(0);
      setReview('');
    
    } catch (error: unknown) {
      parseErrorMessage(error)
      toast.error(parseErrorMessage(error))
      
    }finally{
      setSubmitting(false)
    }
    
  }
  // reply submit
  async function handleSubmitReply(reviewId:number) {
    try {
      setSubmitting(true)
      const replyData = { reply, reviewId, name: user?.name }
      await  apiPrivate.post(`/user-review/${vendorPublicId}/reply`,replyData)
    
      queryClient.invalidateQueries({ queryKey: ['user-profile',vendorPublicId] })
     
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
          //vendorPublicId={vendorPublicId}
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

       {/* review form here */}
   
      {user?.id !== vendorId && showReviewForm && (
        <div className="px-0 md:px-10 lg:px-24 mt-12">
          <div className="bg-white/50 dark:bg-card border border-border rounded-xl shadow-sm p-6 space-y-5">

            {/* Header */}
            <div>
              <h4 className="text-lg font-semibold text-foreground">Rate Your Experience</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Share your honest feedback to help others.
              </p>
            </div>

            {/* Rating Row */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Your Rating:</span>

              <div className="flex items-center gap-1">
                {stars.map((star) => {
                  const display = hover || ratings;
                  const filled = star <= display;

                  return (
                    <Star
                      key={star}
                      size={28}
                      className={`cursor-pointer transition-transform hover:scale-110 ${
                        filled
                          ? "fill-amber-500 text-amber-500"
                          : "text-gray-300 dark:text-gray-500"
                      }`}
                      onClick={() => setRatings(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Review Input */}
            <Textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write a helpful review…"
              className="min-h-[120px] text-sm"
            />

            {/* Submit Button */}
            <Button
              disabled={submitting || !ratings || !review}
              onClick={handleSubmitReview}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </div>
      )}

    </div>
  )
}
