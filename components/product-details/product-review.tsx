"use client"
import { ProductReview } from '@/types/users';
import { useFetchPublicData } from '@/utils/fetch-hooks';
import { Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import LoadingSpinners from '../loading-spinners';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { StarRating } from '@/utils/star-rating';
import apiPrivate, { parseErrorMessage } from '@/utils/api-private';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth-stores';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { timeAgo } from '@/utils/date-format';



export default function ProductReviews({productID,sellerId}:{productID:number,sellerId:number | undefined}) {
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [ratings, setRatings] = useState<number>(0)
  const[review,setReview]=useState<string>('')
  const [hover, setHover] = useState<number>(0)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const queryClient= useQueryClient()
  const {user}=useAuthStore()
  
  const stars = [1, 2, 3, 4, 5]

  
  
 
  // fetch all reviews for this product
  const { data, isLoading } = useFetchPublicData<ProductReview[]>({
      queryKey: 'product-reviews',
      requestUrl: `/review/${productID}`,
      queryParams: String(productID),
    })
  // memoize the data
  const productReviews:ProductReview[] = useMemo(() => {
    if (!data) return [];
    return data;
  }, [data]);
  
  // calculate average rating
 const averageRating = useMemo(() => {
    if (productReviews.length === 0) return 0;
   const avgRate=productReviews.reduce((a, r) => a + r.ratings, 0) / productReviews.length;
   // round off to the nearest whole number
   return Math.ceil(avgRate)
 }, [productReviews]);
  
  
  // handle submit form
  async function handleSubmitReview() {
    try {
      setSubmitting(true)
      const reviewData={ratings,comment:review,productId:productID,name:user?.name}
      await  apiPrivate.post(`/review/${productID}`,reviewData)
    
      queryClient.invalidateQueries({ queryKey: ['product-reviews',String(productID)] })
      setShowReviewForm(false);
      setRatings(0);
      setReview('');
    
    } catch (error: unknown) {
      parseErrorMessage(error)
      toast.error(parseErrorMessage(error))
      
    }finally{
      setSubmitting(false)
    }
    
  }
  
  if (isLoading) return <><LoadingSpinners text='Loading reviews' /></>


  return (
    
       <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
         <h2 className="text-lg md:text-2xl font-semibold text-gray-900 mb-4 border-b pb-2 flex justify-between items-center">
           <span>Customer Reviews ({productReviews.length})</span>
        {user?.id !== sellerId &&
          <button onClick={() => setShowReviewForm(!showReviewForm)} className="text-sm font-semibold text-emerald-600 hover:underline">
             Write a Review
           </button>}
         </h2>
   
         <div className="flex items-center mb-6">
           <StarRating rating={averageRating} />
           <span className="text-3xl font-bold text-amber-600 ml-2 mr-4">{averageRating}</span>
           <span className="text-gray-500">Based on {productReviews.length} ratings</span>
      </div>
      
      {!isLoading && productReviews.length === 0 &&
        <p className="text-gray-500 flex items-center justify-center ">No reviews yet. Be the first to write one!</p>}
   
       <div className="grid gap-2 ">
  {productReviews.map((review) => (
    <div
      key={review.id}
      className="rounded-xl border border-gray-200 bg-white p-5  hover:shadow-sm transition-shadow"
    >
      <div className="flex items-center gap-3 mb-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
          {review.name?.charAt(0)?.toUpperCase()}
        </div>

        <div>
          <p className="font-semibold text-gray-900 leading-tight">{review.name}</p>
          <StarRating rating={review.ratings} />
        </div>
      </div>

      {/* Comment */}
      <p className="text-gray-700 leading-relaxed">{review.comment}</p>

      {/* Optional: date or metadata */}
      {review.createdAt && (
        <p className="text-xs text-gray-400 mt-3">
          {timeAgo(review.createdAt)}
        </p>
      )}
    </div>
  ))}
</div>

      {/* review form here */}
  <div
  className={`
    transition-all duration-700
    ${showReviewForm ? "translate-y-4 h-auto opacity-100" : " h-0 opacity-0 "}
  `}
>
  {user ? (
    <div className="mt-12 px-0 md:px-2 ">
      <div className="border border-border rounded-xl bg-white/50 dark:bg-card shadow-sm p-6 space-y-6">

        {/* Header */}
        <div>
          <h4 className="text-lg font-semibold text-foreground">Rate This Product</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Your review helps others make informed decisions.
          </p>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-3">
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
          placeholder="Share your experience with this product…"
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
  ) : (
    <p className="p-4 mt-4 text-sm text-center text-gray-500">
      Please{" "}
      <Link href="/signin&signup-auth" className="text-emerald-600 underline">
        login
      </Link>{" "}
      to write a review.
    </p>
  )}
</div>

 
       </div>
  )
}
