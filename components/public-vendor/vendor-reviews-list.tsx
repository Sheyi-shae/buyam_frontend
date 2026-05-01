"use client"

import { UserReview } from "@/types/users"
import { Button } from "../ui/button"
import { Reply, Send, Star, ThumbsUp, User, UserCheck, X } from "lucide-react"
import { timeAgo } from "@/utils/date-format"
import { Input } from "../ui/input"

interface VendorReviewsListProps {
    vendor: UserReview[]
    activeReview: number | null
    toggleReplyForm: (reviewId: number) => void
    reply: string
    setReply: React.Dispatch<React.SetStateAction<string>>
    handleSubmitReply: (reviewId: number) => void
    handleReviewLike: (reviewId: number) => void
  userId: number | undefined
  mode?: string | null
}


export default function VendorReviewsList({vendor,activeReview, handleReviewLike, toggleReplyForm, reply, setReply, handleSubmitReply, userId,mode="profile"}: VendorReviewsListProps) {
  
    

    return (
   <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground mb-4">Recent Reviews</h3>
        {vendor.length === 0 && mode === "profile" ? (
          <p className="text-gray-500 flex items-center justify-center ">No reviews yet</p>
        ) : (
          <p className="text-gray-500 flex items-center justify-center ">No reviews yet. Be the first to write one!</p>
        )}
            {vendor.map((review) =>{
                const isOpen = activeReview === review.id
                const isLiked = review.likes.some(like => like.userId === userId)

            
            return (
            
          <div key={review.id} className="border border-border rounded-lg p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-4 flex-1">
                <UserCheck className="w-6 h-6 text-slate-500" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm sm:text-base font-semibold text-foreground">{review.name}</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < review.ratings ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {timeAgo(review.createdAt) }
                  </p>
                </div>
              </div>
            </div>

            <div>
            
              <p className="text-sm text-foreground/80 mb-4">{review.comment}</p>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <Button  variant="ghost" onClick={() => handleReviewLike(review.id)} size="sm" className="gap-2 text-xs hover:bg-neutral-50 hover:text-amber-600">
                <ThumbsUp className={isLiked ? "w-4 h-4 text-amber-600 fill-amber-600" : "w-4 h-4"} />
               {review.likes.length} Helpful 
              </Button>
              <Button onClick={() => toggleReplyForm(review.id)} variant="ghost" size="sm" className="gap-2 text-xs">
                
                        {activeReview === review.id ?
                           <><X/> Cancel</> : <><Reply/> Reply</>}
              </Button>
              
                </div>
                {/* display replies here */}
               {review.replies.length > 0 && (
                <div className="mt-3 pl-12 border-l-2 border-border space-y-4">
                    {review.replies.map((reply) => (
                    <div
                        key={reply.id}
                        className="bg-muted/40 p-3 rounded-lg shadow-sm"
                    >
                        <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-primary" />
                        <p className="text-xs font-medium text-foreground">
                            {reply.name}
                        </p>
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed">
                        {reply.reply}
                        </p>

                        {reply.createdAt && (
                        <p className="text-[10px] text-muted-foreground mt-2">
                            {timeAgo(reply.createdAt)}
                        </p>
                        )}
                    </div>
                    ))}
                </div>
                )}

            {/* reply form for a particular review */}
             {  isOpen  && <div className="flex gap-2 mt-2">
                <Input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
                <Button
                  onClick={()=>handleSubmitReply(review.id)}
                  className="bg-emerald-600"><Send/></Button>


              </div>}
          </div>
        )
      })}
      </div>
  )
}
